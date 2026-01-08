"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Users, FileText, TrendingUp, DollarSign, Loader2, Plus } from "lucide-react"
import { Logo } from "@/components/logo"

interface AdminStats {
  stats: {
    userCount: number
    physicianCount: number
    investorCount: number
    applicationCount: number
    dealCount: number
    investmentCount: number
  }
  recentApplications: Array<{
    id: string
    fullName: string | null
    status: string
    createdAt: string
    user: { name: string | null; email: string }
  }>
  recentInvestments: Array<{
    id: string
    amount: string
    investedAt: string
    user: { name: string | null; email: string }
    deal: { name: string }
  }>
}

export default function AdminPage() {
  const [data, setData] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showDealForm, setShowDealForm] = useState(false)
  const [dealForm, setDealForm] = useState({
    name: "",
    description: "",
    specialty: "",
    targetAmount: "",
    minimumInvestment: "",
    targetIRR: "",
    termMonths: "",
  })
  const [isCreatingDeal, setIsCreatingDeal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/admin")
        if (response.status === 403) {
          setError("You don't have admin access")
          return
        }
        if (response.ok) {
          const result = await response.json()
          setData(result)
        }
      } catch {
        setError("Failed to load admin data")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreatingDeal(true)

    try {
      const response = await fetch("/api/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: dealForm.name,
          description: dealForm.description,
          specialty: dealForm.specialty,
          targetAmount: parseFloat(dealForm.targetAmount),
          minimumInvestment: parseFloat(dealForm.minimumInvestment),
          targetIRR: dealForm.targetIRR ? parseFloat(dealForm.targetIRR) : null,
          termMonths: dealForm.termMonths ? parseInt(dealForm.termMonths) : null,
        }),
      })

      if (response.ok) {
        setShowDealForm(false)
        setDealForm({
          name: "",
          description: "",
          specialty: "",
          targetAmount: "",
          minimumInvestment: "",
          targetIRR: "",
          termMonths: "",
        })
        // Refresh data
        const statsResponse = await fetch("/api/admin")
        if (statsResponse.ok) {
          const result = await statsResponse.json()
          setData(result)
        }
      } else {
        const err = await response.json()
        alert(err.error || "Failed to create deal")
      }
    } catch {
      alert("Failed to create deal")
    } finally {
      setIsCreatingDeal(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>
          <Logo />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, deals, and platform data</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{data?.stats.userCount || 0}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{data?.stats.physicianCount || 0}</p>
                <p className="text-xs text-muted-foreground">Physicians</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{data?.stats.investorCount || 0}</p>
                <p className="text-xs text-muted-foreground">Investors</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{data?.stats.applicationCount || 0}</p>
                <p className="text-xs text-muted-foreground">Applications</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{data?.stats.dealCount || 0}</p>
                <p className="text-xs text-muted-foreground">Deals</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{data?.stats.investmentCount || 0}</p>
                <p className="text-xs text-muted-foreground">Investments</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Create Deal Form */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Create New Deal</h2>
            <Button
              variant={showDealForm ? "outline" : "default"}
              onClick={() => setShowDealForm(!showDealForm)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              {showDealForm ? "Cancel" : "New Deal"}
            </Button>
          </div>

          {showDealForm && (
            <form onSubmit={handleCreateDeal} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Deal Name</label>
                <input
                  type="text"
                  value={dealForm.name}
                  onChange={(e) => setDealForm({ ...dealForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="Orthopedic Surgery Fund"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Specialty</label>
                <input
                  type="text"
                  value={dealForm.specialty}
                  onChange={(e) => setDealForm({ ...dealForm, specialty: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="Orthopedics"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Amount ($)</label>
                <input
                  type="number"
                  value={dealForm.targetAmount}
                  onChange={(e) => setDealForm({ ...dealForm, targetAmount: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="500000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Minimum Investment ($)</label>
                <input
                  type="number"
                  value={dealForm.minimumInvestment}
                  onChange={(e) => setDealForm({ ...dealForm, minimumInvestment: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="25000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target IRR (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={dealForm.targetIRR}
                  onChange={(e) => setDealForm({ ...dealForm, targetIRR: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="12.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Term (months)</label>
                <input
                  type="number"
                  value={dealForm.termMonths}
                  onChange={(e) => setDealForm({ ...dealForm, termMonths: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="60"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={dealForm.description}
                  onChange={(e) => setDealForm({ ...dealForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  placeholder="Describe the investment opportunity..."
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" disabled={isCreatingDeal}>
                  {isCreatingDeal ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    "Create Deal"
                  )}
                </Button>
              </div>
            </form>
          )}
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Applications</h2>
            <div className="space-y-3">
              {data?.recentApplications.length === 0 ? (
                <p className="text-muted-foreground text-sm">No applications yet</p>
              ) : (
                data?.recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-medium">{app.fullName || app.user.name || app.user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        app.status === "APPROVED"
                          ? "bg-green-500/20 text-green-600"
                          : app.status === "SUBMITTED"
                            ? "bg-blue-500/20 text-blue-600"
                            : "bg-gray-500/20 text-gray-600"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Recent Investments */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Investments</h2>
            <div className="space-y-3">
              {data?.recentInvestments.length === 0 ? (
                <p className="text-muted-foreground text-sm">No investments yet</p>
              ) : (
                data?.recentInvestments.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div>
                      <p className="font-medium">{inv.user.name || inv.user.email}</p>
                      <p className="text-xs text-muted-foreground">{inv.deal.name}</p>
                    </div>
                    <span className="font-semibold text-primary">
                      ${(parseFloat(inv.amount) / 1000).toFixed(0)}k
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
