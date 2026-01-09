/**
 * Sync CMS Posts Script
 * Fetches all published posts from Payload CMS and saves to local cache
 * This runs at build time to ensure posts are available offline
 */

const fs = require("fs")
const path = require("path")

// Configuration
const CMS_API_URL =
  process.env.CMS_API_URL || "https://admin.rezaesfahanian.com/api"
const WEBSITE_ID = process.env.WEBSITE_ID || "reza-website"
const OUTPUT_FILE = path.join(__dirname, "../public/data/cmsPosts.json")

/**
 * Fetch all posts from CMS with pagination
 */
async function fetchAllPosts() {
  const allPosts = []
  let page = 1
  let hasMore = true

  console.log(`🔄 Fetching posts from CMS: ${CMS_API_URL}`)
  console.log(`   Website ID: ${WEBSITE_ID}`)

  while (hasMore) {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "100",
        "where[externalSource][equals]": WEBSITE_ID,
        "where[_status][equals]": "published",
        sort: "-publishedAt",
        depth: "2", // Include nested relationships
      })

      const url = `${CMS_API_URL}/posts?${params}`
      console.log(`   Fetching page ${page}...`)

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`CMS API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.docs || !Array.isArray(data.docs)) {
        throw new Error("Invalid response format from CMS")
      }

      allPosts.push(...data.docs)
      hasMore = data.hasNextPage
      page++

      console.log(`   ✓ Found ${data.docs.length} posts on page ${page - 1}`)
    } catch (error) {
      console.error(`   ❌ Error fetching page ${page}:`, error.message)
      hasMore = false
    }
  }

  return allPosts
}

/**
 * Main sync function
 */
async function sync() {
  console.log("\n📦 CMS Posts Sync Script")
  console.log("========================\n")

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
    console.log(`📁 Created directory: ${outputDir}`)
  }

  try {
    const posts = await fetchAllPosts()

    const cache = {
      posts,
      lastUpdated: new Date().toISOString(),
      source: "cms",
      version: 1,
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(cache, null, 2))

    console.log(`\n✅ Successfully synced ${posts.length} posts`)
    console.log(`   Output: ${OUTPUT_FILE}`)
    console.log(`   Last updated: ${cache.lastUpdated}\n`)
  } catch (error) {
    console.error("\n❌ Sync failed:", error.message)

    // Create empty cache file if it doesn't exist
    if (!fs.existsSync(OUTPUT_FILE)) {
      const emptyCache = {
        posts: [],
        lastUpdated: null,
        source: "cms",
        version: 1,
      }
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(emptyCache, null, 2))
      console.log("   Created empty cache file as fallback")
    }

    // Don't exit with error - allow build to continue
    console.log("   Build will continue with existing cache/static posts\n")
  }
}

// Run sync
sync()

