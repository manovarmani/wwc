"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowUp, DollarSign, TrendingUp, Filter, Download, ChevronLeft, Loader2, X, CheckCircle2 } from "lucide-react"
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
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [filterDateRange, setFilterDateRange] = useState("all")
  const [filterSpecialty, setFilterSpecialty] = useState("all")
  const [exportFormat, setExportFormat] = useState("csv")
  const [exportStarted, setExportStarted] = useState(false)

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
          <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={() => setShowFilterModal(true)}>
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={() => setShowExportModal(true)}>
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

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Filter Data</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date Range</label>
                <select
                  value={filterDateRange}
                  onChange={(e) => setFilterDateRange(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="all">All Time</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                  <option value="365">Last Year</option>
                  <option value="ytd">Year to Date</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Specialty</label>
                <select
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="all">All Specialties</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="radiology">Radiology</option>
                  <option value="surgery">Surgery</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => {
                  setFilterDateRange("all")
                  setFilterSpecialty("all")
                }}>
                  Reset
                </Button>
                <Button className="flex-1" onClick={() => setShowFilterModal(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Export Data</h3>
              <button
                onClick={() => {
                  setShowExportModal(false)
                  setExportStarted(false)
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {exportStarted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Export Started!</h4>
                <p className="text-muted-foreground">Your download will begin shortly.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Export Format</label>
                  <div className="space-y-2">
                    {[
                      { value: "csv", label: "CSV", desc: "Best for Excel and spreadsheets" },
                      { value: "pdf", label: "PDF", desc: "Best for reports and printing" },
                      { value: "xlsx", label: "Excel (.xlsx)", desc: "Native Excel format" },
                    ].map((format) => (
                      <label
                        key={format.value}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                          exportFormat === format.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="exportFormat"
                          value={format.value}
                          checked={exportFormat === format.value}
                          onChange={(e) => setExportFormat(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{format.label}</p>
                          <p className="text-sm text-muted-foreground">{format.desc}</p>
                        </div>
                        {exportFormat === format.value && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Include</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded border-border" />
                      <span className="text-sm">Portfolio Summary</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded border-border" />
                      <span className="text-sm">Investment Details</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded border-border" />
                      <span className="text-sm">Distribution History</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-border" />
                      <span className="text-sm">Tax Documents</span>
                    </label>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setExportStarted(true)
                    setTimeout(() => {
                      setShowExportModal(false)
                      setExportStarted(false)
                    }, 2000)
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download {exportFormat.toUpperCase()}
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
