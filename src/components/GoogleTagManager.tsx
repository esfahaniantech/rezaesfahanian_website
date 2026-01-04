"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

const GTM_ID = "GTM-5B6JXBST"
const COOKIE_PREFERENCES_KEY = "cookie-preferences"

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export function GoogleTagManager() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check initial consent status
    const checkConsent = () => {
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)
      if (savedPreferences) {
        const prefs: CookiePreferences = JSON.parse(savedPreferences)
        // Enable GTM if analytics OR marketing is enabled
        setIsEnabled(prefs.analytics || prefs.marketing)
      }
    }

    checkConsent()

    // Listen for consent updates
    const handleConsentUpdate = (e: CustomEvent<CookiePreferences>) => {
      const prefs = e.detail
      const shouldEnable = prefs.analytics || prefs.marketing
      setIsEnabled(shouldEnable)

      // If disabling and GTM was loaded, we need to handle cleanup
      if (!shouldEnable && isLoaded) {
        // Push consent update to dataLayer
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "consent_update",
            analytics_storage: "denied",
            ad_storage: "denied",
          })
        }
      }

      // If enabling, push consent granted
      if (shouldEnable && isLoaded && typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "consent_update",
          analytics_storage: prefs.analytics ? "granted" : "denied",
          ad_storage: prefs.marketing ? "granted" : "denied",
        })
      }
    }

    window.addEventListener(
      "cookieConsentUpdate",
      handleConsentUpdate as EventListener
    )

    return () => {
      window.removeEventListener(
        "cookieConsentUpdate",
        handleConsentUpdate as EventListener
      )
    }
  }, [isLoaded])

  // Initialize dataLayer with default consent state
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []

      // Set default consent to denied (GDPR compliant)
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      })
    }
  }, [])

  const handleScriptLoad = () => {
    setIsLoaded(true)

    // Push initial consent state based on saved preferences
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)
    if (savedPreferences && typeof window !== "undefined" && window.dataLayer) {
      const prefs: CookiePreferences = JSON.parse(savedPreferences)
      window.dataLayer.push({
        event: "consent_update",
        analytics_storage: prefs.analytics ? "granted" : "denied",
        ad_storage: prefs.marketing ? "granted" : "denied",
      })
    }
  }

  if (!isEnabled) {
    return null
  }

  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  )
}

// Noscript component for body - only shows if consent was given
export function GoogleTagManagerNoScript() {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)
    if (savedPreferences) {
      const prefs: CookiePreferences = JSON.parse(savedPreferences)
      setIsEnabled(prefs.analytics || prefs.marketing)
    }
  }, [])

  if (!isEnabled) {
    return null
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  )
}

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

