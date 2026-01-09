/**
 * CMS Integration Module
 * Export all CMS-related functionality from a single entry point
 */

// Types
export * from "./types"

// Client
export {
  cmsClient,
  resolveMediaUrl,
  fetchPosts,
  fetchPostBySlug,
  fetchCategories,
  getAuthor,
} from "./client"

