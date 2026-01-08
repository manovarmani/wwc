"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface Investment {
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
}

interface PortfolioOverviewProps {
  investments: Investment[]
}

export default function PortfolioOverview({ investments }: PortfolioOverviewProps) {
  // Calculate portfolio stats
  const totalInvested = investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0)
  const totalValue = investments.reduce((sum, inv) => sum + parseFloat(inv.currentValue), 0)

  // Group by status (simplified - in real app would track actual status)
  const activeCount = investments.length
  const totalDistributions = investments.reduce(
    (sum, inv) => sum + inv.distributions.reduce((dSum, d) => dSum + parseFloat(d.amount), 0),
    0
  )

  // If no investments, show empty state
  if (investments.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="p-12 text-center">
          <h3 className="text-xl font-semibold mb-2">No Investments Yet</h3>
          <p className="text-muted-foreground mb-4">
            Browse available deals to start building your physician financing portfolio.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Portfolio Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Invested</span>
              <span className="font-semibold">${(totalInvested / 1000).toFixed(0)}k</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Value</span>
              <span className="font-semibold">${(totalValue / 1000).toFixed(0)}k</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Return</span>
              <span className="font-semibold text-green-600">
                +{((totalValue - totalInvested) / totalInvested * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Positions</span>
              <span className="font-semibold">{activeCount}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-6">Distribution History</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Distributions</span>
              <span className="font-semibold">${(totalDistributions / 1000).toFixed(1)}k</span>
            </div>
            {investments.slice(0, 3).map((inv) => {
              const lastDist = inv.distributions[0]
              if (!lastDist) return null
              return (
                <div key={inv.id} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{inv.deal.name}</span>
                  <span className="font-medium">${parseFloat(lastDist.amount).toFixed(0)}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Individual Positions */}
      <div>
        <h3 className="font-semibold mb-4">Your Positions</h3>
        <div className="space-y-3">
          {investments.map((investment) => {
            const invested = parseFloat(investment.amount)
            const current = parseFloat(investment.currentValue)
            const returnPct = ((current - invested) / invested * 100).toFixed(1)
            const irr = investment.deal.targetIRR ? parseFloat(investment.deal.targetIRR) : null

            return (
              <Card key={investment.id} className="p-4 hover:border-primary transition cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{investment.deal.name}</h4>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {investment.deal.specialty || "Multi-Specialty"}
                    </p>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Invested</p>
                        <p className="font-semibold">${(invested / 1000).toFixed(0)}k</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Current Value</p>
                        <p className="font-semibold">${(current / 1000).toFixed(0)}k</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Return</p>
                        <p className="font-semibold text-green-600">+{returnPct}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Target IRR</p>
                        <p className="font-semibold text-primary">{irr ? `${irr}%` : "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
