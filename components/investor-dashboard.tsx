"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowUp, DollarSign, TrendingUp, Filter, Download, ChevronLeft } from "lucide-react"
import PortfolioOverview from "./portfolio-overview"
import DealsList from "./deals-list"
import PerformanceChart from "./performance-chart"

export default function InvestorDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "deals" | "performance">("overview")

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
              <p className="text-3xl font-bold">$1.25M</p>
              <p className="text-xs text-muted-foreground mt-2">Across 12 deals</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Value</p>
              <p className="text-3xl font-bold">$1.48M</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <p className="text-xs font-medium text-green-600">+18.4% gain</p>
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. IRR</p>
              <p className="text-3xl font-bold">13.2%</p>
              <p className="text-xs text-muted-foreground mt-2">Projected annual return</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">YTD Distributions</p>
              <p className="text-3xl font-bold">$84.5k</p>
              <p className="text-xs text-muted-foreground mt-2">From Q1 & Q2 payouts</p>
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
            {tab === "deals" && "Your Deals"}
            {tab === "performance" && "Performance"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <PortfolioOverview />}
      {activeTab === "deals" && <DealsList />}
      {activeTab === "performance" && <PerformanceChart />}
    </div>
  )
}
