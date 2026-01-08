"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowUp, DollarSign, TrendingUp, Filter, Download, ChevronLeft, Loader2 } from "lucide-react"
import PortfolioOverview from "./portfolio-overview"
import DealsList from "./deals-list"
import PerformanceChart from "./performance-chart"

interface DashboardData {
  metrics: {
    totalInvested: number
    currentValue: number
    totalDistributions: number
    ytdReturn: number
    portfolioIRR: number
    investmentCount: number
  }
  investments: Array<{
    id: string
    amount: string
    currentValue: string
    deal: {
      id: string
      name: string
      specialty: string | null
      targetIRR: string | null
    }
    distributions: Array<{
      id: string
      amount: string
      paidAt: string
    }>
  }>
  bySpecialty: Record<string, { invested: number; currentValue: number; count: number }>
}

export default function InvestorDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "deals" | "performance">("overview")
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/dashboard")
        if (response.ok) {
          const result = await response.json()
          if (result.role === "INVESTOR") {
            setData(result)
          }
        }
      } catch {
        // Handle error
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`
    }
    return `$${value.toFixed(0)}`
  }

  // Use real data or demo defaults
  const metrics = data?.metrics || {
    totalInvested: 0,
    currentValue: 0,
    totalDistributions: 0,
    ytdReturn: 0,
    portfolioIRR: 0,
    investmentCount: 0,
  }

  const hasInvestments = metrics.totalInvested > 0
  const gainPercent = metrics.totalInvested > 0
    ? ((metrics.currentValue - metrics.totalInvested) / metrics.totalInvested * 100).toFixed(1)
    : "0"

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Your Investment Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your physician financing portfolio and returns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
              <p className="text-3xl font-bold">{formatCurrency(metrics.totalInvested)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Across {metrics.investmentCount} deal{metrics.investmentCount !== 1 ? "s" : ""}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-primary opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Value</p>
              <p className="text-3xl font-bold">{formatCurrency(metrics.currentValue)}</p>
              {hasInvestments && (
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <p className="text-xs font-medium text-green-600">+{gainPercent}% gain</p>
                </div>
              )}
            </div>
            <TrendingUp className="h-8 w-8 text-green-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Portfolio IRR</p>
              <p className="text-3xl font-bold">{metrics.portfolioIRR.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-2">Projected annual return</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Distributions</p>
              <p className="text-3xl font-bold">{formatCurrency(metrics.totalDistributions)}</p>
              <p className="text-xs text-muted-foreground mt-2">Lifetime payouts</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary opacity-20" />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border">
        {(["overview", "deals", "performance"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition ${
              activeTab === tab
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "overview" && "Portfolio Overview"}
            {tab === "deals" && "Available Deals"}
            {tab === "performance" && "Performance"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <PortfolioOverview investments={data?.investments || []} />}
      {activeTab === "deals" && <DealsList />}
      {activeTab === "performance" && <PerformanceChart />}
    </div>
  )
}
