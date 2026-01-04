"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Cookie, Settings, X } from "lucide-react"
import Link from "next/link"

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = "cookie-consent"
const COOKIE_PREFERENCES_KEY = "cookie-preferences"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!hasConsented) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      // Load saved preferences
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences))
      }
    }
  }, [])

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true")
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs))
    setPreferences(prefs)
    setShowBanner(false)
    setShowSettings(false)

    // Dispatch event for analytics scripts to listen to
    window.dispatchEvent(
      new CustomEvent("cookieConsentUpdate", { detail: prefs })
    )
  }

  const acceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
    })
  }

  const rejectAll = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
    })
  }

  const savePreferences = () => {
    saveConsent(preferences)
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Overlay for settings modal */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[9998]"
              onClick={() => setShowSettings(false)}
            />
          )}

          {/* Cookie Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4"
          >
            <div className="container mx-auto max-w-4xl">
              <div className="bg-card border border-border shadow-2xl p-6">
                {!showSettings ? (
                  /* Main Banner */
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                        <Cookie className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2">
                          We value your privacy
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          We use cookies to enhance your browsing experience, analyze site 
                          traffic, and personalize content. By clicking "Accept All", you 
                          consent to our use of cookies. Read our{" "}
                          <Link
                            href="/privacy"
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </Link>{" "}
                          for more information.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <Button
                        variant="outline"
                        onClick={() => setShowSettings(true)}
                        className="gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Customize
                      </Button>
                      <Button variant="outline" onClick={rejectAll}>
                        Reject All
                      </Button>
                      <Button onClick={acceptAll}>Accept All</Button>
                    </div>
                  </div>
                ) : (
                  /* Settings Panel */
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-foreground">
                        Cookie Preferences
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSettings(false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4 mb-6">
                      {/* Essential Cookies */}
                      <div className="flex items-start justify-between p-4 bg-secondary/30">
                        <div className="flex-1 mr-4">
                          <h4 className="font-semibold text-foreground mb-1">
                            Essential Cookies
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            These cookies are necessary for the website to function properly 
                            and cannot be disabled.
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={true}
                            disabled
                            className="w-5 h-5 accent-primary cursor-not-allowed opacity-60"
                          />
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-start justify-between p-4 bg-secondary/30">
                        <div className="flex-1 mr-4">
                          <h4 className="font-semibold text-foreground mb-1">
                            Analytics Cookies
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            These cookies help us understand how visitors interact with our 
                            website by collecting anonymous information (Google Tag Manager, Google Analytics).
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={(e) =>
                              setPreferences({
                                ...preferences,
                                analytics: e.target.checked,
                              })
                            }
                            className="w-5 h-5 accent-primary cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="flex items-start justify-between p-4 bg-secondary/30">
                        <div className="flex-1 mr-4">
                          <h4 className="font-semibold text-foreground mb-1">
                            Marketing Cookies
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            These cookies are used to track visitors across websites to display 
                            relevant advertisements (Meta Pixel, HubSpot).
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={(e) =>
                              setPreferences({
                                ...preferences,
                                marketing: e.target.checked,
                              })
                            }
                            className="w-5 h-5 accent-primary cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <Button variant="outline" onClick={rejectAll}>
                        Reject All
                      </Button>
                      <Button onClick={savePreferences}>Save Preferences</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Hook to check cookie consent
export function useCookieConsent(): CookiePreferences | null {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null)

  useEffect(() => {
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }

    const handleConsentUpdate = (e: CustomEvent<CookiePreferences>) => {
      setPreferences(e.detail)
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
  }, [])

  return preferences
}

