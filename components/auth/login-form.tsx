"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Loader2 } from "lucide-react"

export default function LoginForm({ onSwitchMode }: { onSwitchMode: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate auth delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication
    if (email && password) {
      // Store user session (mock)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          role: email.includes("physician") ? "physician" : "investor",
          id: Math.random().toString(36).substr(2, 9),
        }),
      )

      // Route based on email pattern
      if (email.includes("physician")) {
        router.push("/physician")
      } else {
        router.push("/investor")
      }
    } else {
      setError("Please fill in all fields")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/50"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <a href="#" className="text-sm text-primary hover:underline">
            Forgot?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/50"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Demo Info */}
      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-sm text-primary">
        <strong>Demo:</strong> Use email with "physician" for physician account, otherwise investor account.
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full gap-2" disabled={isLoading} size="lg">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>

      {/* Switch Mode */}
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchMode}
          className="text-primary hover:underline font-medium"
          disabled={isLoading}
        >
          Create one
        </button>
      </p>
    </form>
  )
}
