"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import LoginForm from "@/components/auth/login-form"
import SignupForm from "@/components/auth/signup-form"
import { Logo } from "@/components/logo"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex flex-col">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <Logo showText={true} />
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
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
