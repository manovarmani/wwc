"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Mail, Lock, User, Loader2, CheckCircle } from "lucide-react"

export default function SignupForm({ onSwitchMode }: { onSwitchMode: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "investor",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store user session (mock)
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        id: Math.random().toString(36).substr(2, 9),
      }),
    )

    setSuccess(true)

    // Redirect after success message
    setTimeout(() => {
      if (formData.role === "physician") {
        router.push("/physician")
      } else {
        router.push("/investor")
      }
    }, 2000)
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Account Created!</h3>
        <p className="text-muted-foreground mb-6">Welcome to White Coat Capital. Redirecting you now...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Dr. Jane Smith"
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/50"
            disabled={isLoading}
          />
        </div>
      </div>

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
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/50"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Role Selection */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium mb-2">
          I am a...
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/50"
          disabled={isLoading}
        >
          <option value="investor">Investor</option>
          <option value="physician">Physician</option>
        </select>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/50"
            disabled={isLoading}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">At least 8 characters</p>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
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

      {/* Submit */}
      <Button type="submit" className="w-full gap-2" disabled={isLoading} size="lg">
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      {/* Switch Mode */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchMode}
          className="text-primary hover:underline font-medium"
          disabled={isLoading}
        >
          Sign in
        </button>
      </p>
    </form>
  )
}
