"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { ChevronLeft, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import LoginForm from "@/components/auth/login-form"
import SignupForm from "@/components/auth/signup-form"
import { Logo } from "@/components/logo"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function AuthContent() {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Handle URL params for verification status
    const verified = searchParams.get("verified")
    const error = searchParams.get("error")
    const message = searchParams.get("message")

    if (verified === "true") {
      setNotification({
        type: "success",
        message: "Email verified successfully! You can now sign in.",
      })
      setMode("login")
    } else if (error) {
      setNotification({
        type: "error",
        message: decodeURIComponent(error),
      })
    } else if (message) {
      setNotification({
        type: "info",
        message: decodeURIComponent(message),
      })
    }

    // Clear URL params after reading
    if (verified || error || message) {
      const url = new URL(window.location.href)
      url.searchParams.delete("verified")
      url.searchParams.delete("error")
      url.searchParams.delete("message")
      url.searchParams.delete("redirect")
      router.replace(url.pathname, { scroll: false })
    }
  }, [searchParams, router])

  return (
    <>
      {/* Notification Banner */}
      {notification && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            notification.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400"
              : notification.type === "error"
                ? "bg-destructive/10 border border-destructive/20 text-destructive"
                : "bg-primary/10 border border-primary/20 text-primary"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="flex-shrink-0 opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Auth Card */}
      <div className="bg-card rounded-xl border border-border shadow-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{mode === "login" ? "Welcome Back" : "Join WCC"}</h1>
          <p className="text-muted-foreground">
            {mode === "login"
              ? "Access your investment or physician account"
              : "Create your account to get started"}
          </p>
        </div>

        {/* Forms */}
        {mode === "login" ? (
          <LoginForm onSwitchMode={() => setMode("signup")} />
        ) : (
          <SignupForm onSwitchMode={() => setMode("login")} />
        )}
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        By continuing, you agree to our{" "}
        <button onClick={() => setShowTerms(true)} className="text-primary hover:underline">
          Terms of Service
        </button>{" "}
        and{" "}
        <button onClick={() => setShowPrivacy(true)} className="text-primary hover:underline">
          Privacy Policy
        </button>
      </p>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Terms of Service</h3>
              <button onClick={() => setShowTerms(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">Last updated: January 2025</p>

              <h4 className="font-semibold mt-6 mb-2">Acceptance of Terms</h4>
              <p className="text-muted-foreground mb-4">
                By accessing or using White Coat Capital&apos;s services, you agree to be bound by these Terms of Service
                and all applicable laws and regulations.
              </p>

              <h4 className="font-semibold mt-6 mb-2">Use of Services</h4>
              <p className="text-muted-foreground mb-4">
                Our services are intended for physicians and accredited investors. You must provide accurate information
                and maintain the confidentiality of your account credentials.
              </p>

              <h4 className="font-semibold mt-6 mb-2">Financial Disclosures</h4>
              <p className="text-muted-foreground mb-4">
                All investment opportunities carry risk. Past performance does not guarantee future results.
                Please review all offering documents carefully before investing.
              </p>

              <h4 className="font-semibold mt-6 mb-2">Limitation of Liability</h4>
              <p className="text-muted-foreground mb-4">
                White Coat Capital shall not be liable for any indirect, incidental, special, or consequential damages
                arising from the use of our services.
              </p>
            </div>
            <Button className="w-full mt-6" onClick={() => setShowTerms(false)}>Close</Button>
          </Card>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Privacy Policy</h3>
              <button onClick={() => setShowPrivacy(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">Last updated: January 2025</p>

              <h4 className="font-semibold mt-6 mb-2">Information We Collect</h4>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly, including name, email, financial information for loan applications,
                and any other information you choose to provide.
              </p>

              <h4 className="font-semibold mt-6 mb-2">How We Use Your Information</h4>
              <p className="text-muted-foreground mb-4">
                We use collected information to provide our services, process applications, communicate with you,
                and improve our platform.
              </p>

              <h4 className="font-semibold mt-6 mb-2">Data Security</h4>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your personal information,
                including encryption and secure data storage.
              </p>

              <h4 className="font-semibold mt-6 mb-2">Your Rights</h4>
              <p className="text-muted-foreground mb-4">
                You have the right to access, correct, or delete your personal information.
                Contact us at privacy@whitecoatcapital.com for any privacy-related requests.
              </p>
            </div>
            <Button className="w-full mt-6" onClick={() => setShowPrivacy(false)}>Close</Button>
          </Card>
        </div>
      )}
    </>
  )
}

function AuthLoading() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-lg p-8">
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex flex-col">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Suspense fallback={<AuthLoading />}>
            <AuthContent />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
