"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, DollarSign, Calendar, Loader2, LogOut } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { createClient } from "@/lib/supabase/client"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
} from "recharts"
import Link from "next/link"

interface DashboardData {
  user: {
    id: string
    name: string | null
    email: string
    role: string
  }
  role: string
  metrics: {
    // Physician metrics
    activeFunding?: number
    monthlyPayment?: number
    portfolioValue?: number
    interestRate?: number
    // Investor metrics
    totalInvested?: number
    currentValue?: number
    totalDistributions?: number
    ytdReturn?: number
    portfolioIRR?: number
    investmentCount?: number
  }
  selectedProposal?: {
    name: string
    amount: string
    interestRate: string
    termMonths: number
    monthlyPayment: string
  }
  investments?: Array<{
    id: string
    amount: string
    currentValue: string
    deal: {
      name: string
      specialty: string | null
    }
  }>
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const isMobile = useIsMobile()
  const supabase = createClient()

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await fetch("/api/dashboard")
        if (response.ok) {
          const result = await response.json()
          setData(result)
        } else if (response.status === 401) {
          router.push("/auth")
        }
      } catch {
        // Handle error
      } finally {
        setIsLoading(false)
      }
    }
    fetchDashboard()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </main>
    )
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Not Logged In</h2>
          <p className="text-muted-foreground mb-4">Please sign in to view your dashboard.</p>
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        </Card>
      </main>
    )
  }

  const userName = data.user.name || data.user.email.split("@")[0]

  // Physician metrics
  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value.toFixed(0)}`
  }

  const monthlyPaymentProjection = Array.from({ length: 28 }, (_, i) => {
    const m = i + 1
    const payment = data.metrics.monthlyPayment || 0
    return { month: `M${m}`, payment: m < 24 ? 0 : payment }
  })

  const portfolioValue = data.metrics.portfolioValue || data.metrics.activeFunding || 0
  const portfolioMiniSeries = [
    { m: "Jan", v: portfolioValue * 0.85 },
    { m: "Feb", v: portfolioValue * 0.88 },
    { m: "Mar", v: portfolioValue * 0.92 },
    { m: "Apr", v: portfolioValue * 0.95 },
    { m: "May", v: portfolioValue * 0.98 },
    { m: "Jun", v: portfolioValue },
  ]

  if (data.role === "PHYSICIAN") {
    const activeFunding = data.metrics.activeFunding || 0
    const monthlyPayment = data.metrics.monthlyPayment || 0
    const interestRate = data.metrics.interestRate || 0
    const hasApplication = activeFunding > 0

    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between mb-12">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome, {userName}</h1>
                <p className="text-muted-foreground">Your physician platform dashboard</p>
              </div>
              <Button variant="outline" onClick={handleSignOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>

            {!hasApplication ? (
              <Card className="p-12 text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Get Started with Funding</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Complete your WCC Fit questionnaire to receive tailored funding proposals.
                </p>
                <Link href="/physician">
                  <Button size="lg">Start Questionnaire</Button>
                </Link>
              </Card>
            ) : (
              <>
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <Card className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Active Funding</p>
                        <p className="text-3xl font-bold">{formatCurrency(activeFunding)}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {data.selectedProposal?.name || "Balanced Track"}
                        </p>
                      </div>
                      {isMobile ? (
                        <div className="w-24 h-14">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={portfolioMiniSeries}>
                              <defs>
                                <linearGradient id="fundingFill" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.05} />
                                </linearGradient>
                              </defs>
                              <Area type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={2} fill="url(#fundingFill)" />
                              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-primary" />
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Monthly Payment</p>
                        <p className="text-3xl font-bold">${monthlyPayment.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground mt-2">Starting in 2 years</p>
                      </div>
                      {isMobile ? (
                        <div className="w-28 h-16 -mr-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyPaymentProjection}>
                              <defs>
                                <linearGradient id="paymentFill" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.06} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                              <XAxis dataKey="month" hide />
                              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }} />
                              <ReferenceArea x1="M24" x2="M28" fill="var(--color-primary)" fillOpacity={0.08} />
                              <ReferenceLine x="M24" stroke="var(--color-border)" strokeDasharray="4 4" />
                              <Area type="stepAfter" dataKey="payment" stroke="var(--color-primary)" strokeWidth={2} fill="url(#paymentFill)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Interest Rate</p>
                        <p className="text-3xl font-bold">{interestRate.toFixed(1)}%</p>
                        <p className="text-xs text-muted-foreground mt-2">Fixed annual rate</p>
                      </div>
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Platform Status</p>
                        <p className="text-3xl font-bold">Active</p>
                        <p className="text-xs text-muted-foreground mt-2">Full access enabled</p>
                      </div>
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Funding Details</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-semibold">{formatCurrency(activeFunding)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span className="text-muted-foreground">Disbursed</span>
                        <span className="font-semibold">{formatCurrency(activeFunding)}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-semibold">{interestRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Next Payment Due</span>
                        <span className="font-semibold">In 24 months</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Platform Access</h2>
                    <div className="space-y-4">
                      <Link href="/tools" className="block w-full p-3 text-left hover:bg-secondary/50 rounded-lg transition">
                        <div className="font-semibold mb-1">Wealth Tools</div>
                        <div className="text-sm text-muted-foreground">Financial calculators & planning</div>
                      </Link>
                      <Link href="/community" className="block w-full p-3 text-left hover:bg-secondary/50 rounded-lg transition">
                        <div className="font-semibold mb-1">Community Forum</div>
                        <div className="text-sm text-muted-foreground">Connect with other physicians</div>
                      </Link>
                      <button className="w-full p-3 text-left hover:bg-secondary/50 rounded-lg transition">
                        <div className="font-semibold mb-1">Career Resources</div>
                        <div className="text-sm text-muted-foreground">Interview prep & salary negotiations</div>
                      </button>
                      <button className="w-full p-3 text-left hover:bg-secondary/50 rounded-lg transition">
                        <div className="font-semibold mb-1">Concierge Support</div>
                        <div className="text-sm text-muted-foreground">24/7 dedicated support team</div>
                      </button>
                    </div>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    )
  }

  // Investor Dashboard
  const totalInvested = data.metrics.totalInvested || 0
  const currentValue = data.metrics.currentValue || 0
  const totalDistributions = data.metrics.totalDistributions || 0
  const portfolioIRR = data.metrics.portfolioIRR || 0
  const investmentCount = data.metrics.investmentCount || 0
  const ytdReturn = totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested * 100) : 0

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome, {userName}</h1>
              <p className="text-muted-foreground">Monitor your WCC investments in real-time</p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Invested</p>
                  <p className="text-3xl font-bold">{formatCurrency(totalInvested)}</p>
                  <p className="text-xs text-muted-foreground mt-2">{investmentCount} active deal{investmentCount !== 1 ? "s" : ""}</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Current Value</p>
                  <p className="text-3xl font-bold">{formatCurrency(currentValue)}</p>
                  <p className="text-xs text-muted-foreground mt-2">+{ytdReturn.toFixed(1)}% YTD</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Distributions</p>
                  <p className="text-3xl font-bold">{formatCurrency(totalDistributions)}</p>
                  <p className="text-xs text-muted-foreground mt-2">Lifetime payouts</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Portfolio IRR</p>
                  <p className="text-3xl font-bold">{portfolioIRR.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground mt-2">Target: 12%+</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          </div>

          {investmentCount === 0 ? (
            <Card className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Start Investing</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Browse available physician financing deals and start building your portfolio.
              </p>
              <Link href="/investor">
                <Button size="lg">View Available Deals</Button>
              </Link>
            </Card>
          ) : (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Your Investments</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-semibold">Deal Name</th>
                      <th className="text-left py-3 font-semibold">Specialty</th>
                      <th className="text-left py-3 font-semibold">Invested</th>
                      <th className="text-left py-3 font-semibold">Current Value</th>
                      <th className="text-left py-3 font-semibold">Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.investments?.map((inv) => {
                      const invested = parseFloat(inv.amount)
                      const current = parseFloat(inv.currentValue)
                      const returnPct = ((current - invested) / invested * 100).toFixed(1)
                      return (
                        <tr key={inv.id} className="border-b border-border hover:bg-secondary/50">
                          <td className="py-3">{inv.deal.name}</td>
                          <td className="py-3">{inv.deal.specialty || "Multi-Specialty"}</td>
                          <td className="py-3">{formatCurrency(invested)}</td>
                          <td className="py-3 font-semibold">{formatCurrency(current)}</td>
                          <td className="py-3 text-primary font-semibold">+{returnPct}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Link href="/investor">
                  <Button variant="outline">View Full Dashboard</Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
