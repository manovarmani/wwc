"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, LogOut, Mail, Phone, MapPin, Building2, Briefcase, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { createClient } from "@/lib/supabase/client"

interface UserProfile {
  id: string
  name: string | null
  email: string
  role: "PHYSICIAN" | "INVESTOR" | "ADMIN"
  phone: string | null
  physicianProfile?: {
    specialty: string | null
    currentEmployer: string | null
  } | null
  investorProfile?: {
    investorType: string | null
  } | null
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    specialty: "",
    currentEmployer: "",
    investorType: "",
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user", { credentials: "include" })
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/auth")
          return
        }
        throw new Error("Failed to fetch user")
      }
      const data = await res.json()
      setUser(data)
      setFormData({
        name: data.name || "",
        phone: data.phone || "",
        specialty: data.physicianProfile?.specialty || "",
        currentEmployer: data.physicianProfile?.currentEmployer || "",
        investorType: data.investorProfile?.investorType || "",
      })
    } catch (error) {
      console.error("Error fetching user:", error)
      router.push("/auth")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          ...(user?.role === "PHYSICIAN" && {
            physicianProfile: {
              specialty: formData.specialty,
              currentEmployer: formData.currentEmployer,
            },
          }),
          ...(user?.role === "INVESTOR" && {
            investorProfile: {
              investorType: formData.investorType,
            },
          }),
        }),
      })

      if (!res.ok) throw new Error("Failed to update profile")

      const updatedUser = await res.json()
      setUser(updatedUser)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    )
  }

  if (!user) return null

  const backLink = user.role === "PHYSICIAN" ? "/physician" : user.role === "INVESTOR" ? "/investor" : "/dashboard"

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href={backLink}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {/* Profile Card */}
        <Card className="p-8 mb-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">
                  {(user.name || user.email)?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{user.name || "No name set"}</h2>
                <p className="text-muted-foreground mb-2">{user.email}</p>
                <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
                  {user.role === "PHYSICIAN" ? "Healthcare Provider" : user.role === "INVESTOR" ? "Investor" : "Administrator"}
                </div>
              </div>
            </div>
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          {/* Form / Display */}
          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>

              {user.role === "PHYSICIAN" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Medical Specialty
                    </label>
                    <input
                      type="text"
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      placeholder="e.g., Cardiology, Surgery"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Current Employer
                    </label>
                    <input
                      type="text"
                      value={formData.currentEmployer}
                      onChange={(e) => setFormData({ ...formData, currentEmployer: e.target.value })}
                      placeholder="Hospital or practice name"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    />
                  </div>
                </>
              ) : user.role === "INVESTOR" ? (
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Investor Type
                  </label>
                  <select
                    value={formData.investorType}
                    onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  >
                    <option value="">Select type</option>
                    <option value="individual">Individual</option>
                    <option value="family_office">Family Office</option>
                    <option value="institution">Institution</option>
                  </select>
                </div>
              ) : null}

              <div className="flex gap-3">
                <Button onClick={handleSave} className="flex-1" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1" disabled={saving}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user.phone || "Not provided"}</p>
                </div>
              </div>
              {user.role === "PHYSICIAN" && (
                <>
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Specialty</p>
                      <p className="font-medium">{user.physicianProfile?.specialty || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Current Employer</p>
                      <p className="font-medium">{user.physicianProfile?.currentEmployer || "Not provided"}</p>
                    </div>
                  </div>
                </>
              )}
              {user.role === "INVESTOR" && (
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Investor Type</p>
                    <p className="font-medium capitalize">
                      {user.investorProfile?.investorType?.replace("_", " ") || "Not provided"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Account Actions */}
        <Card className="p-6 bg-destructive/5 border-destructive/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Account Management</h3>
              <p className="text-sm text-muted-foreground">Sign out of your account</p>
            </div>
            <Button variant="destructive" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}
