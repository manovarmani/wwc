"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, X } from "lucide-react"
import LoginForm from "@/components/auth/login-form"
import SignupForm from "@/components/auth/signup-form"
import { Logo } from "@/components/logo"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

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
        </div>
      </div>

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
    </main>
  )
}
