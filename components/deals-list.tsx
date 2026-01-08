"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Loader2 } from "lucide-react"

interface Deal {
  id: string
  name: string
  description: string | null
  specialty: string | null
  dealType: string | null
  targetAmount: string
  minimumInvestment: string
  currentAmount: number
  targetIRR: string | null
  targetMOIC: string | null
  termMonths: number | null
  status: string
  investorCount: number
}

export default function DealsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [deals, setDeals] = useState<Deal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [investing, setInvesting] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch("/api/deals")
        if (response.ok) {
          const data = await response.json()
          setDeals(data)
        }
      } catch {
        // Handle error
      } finally {
        setIsLoading(false)
      }
    }
    fetchDeals()
  }, [])

  const handleInvest = async (dealId: string, amount: number) => {
    setInvesting(dealId)
    try {
      const response = await fetch("/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dealId, amount }),
      })

      if (response.ok) {
        // Refresh deals
        const dealsResponse = await fetch("/api/deals")
        if (dealsResponse.ok) {
          const data = await dealsResponse.json()
          setDeals(data)
        }
        alert("Investment successful!")
      } else {
        const error = await response.json()
        alert(error.error || "Investment failed")
      }
    } catch {
      alert("Investment failed")
    } finally {
      setInvesting(null)
    }
  }

  const filteredDeals = deals.filter(
    (deal) =>
      deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (deal.specialty && deal.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (deals.length === 0) {
    return (
      <Card className="p-12 text-center">
        <h3 className="text-xl font-semibold mb-2">No Deals Available</h3>
        <p className="text-muted-foreground">
          Check back soon for new physician financing opportunities.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-secondary/30">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by deal name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      {/* Deals */}
      <div className="space-y-3">
        {filteredDeals.map((deal) => {
          const targetAmount = parseFloat(deal.targetAmount)
          const minInvestment = parseFloat(deal.minimumInvestment)
          const fundingProgress = targetAmount > 0 ? (deal.currentAmount / targetAmount) * 100 : 0
          const availableAmount = targetAmount - deal.currentAmount
          const termYears = deal.termMonths ? Math.round(deal.termMonths / 12) : null
          const irr = deal.targetIRR ? parseFloat(deal.targetIRR) : null

          return (
            <Card key={deal.id} className="p-6 hover:border-primary transition">
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-semibold mb-1">{deal.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {deal.specialty || "Multi-Specialty"}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Target Amount</p>
                      <p className="font-semibold">${(targetAmount / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Min Investment</p>
                      <p className="font-semibold">${(minInvestment / 1000).toFixed(0)}k</p>
                    </div>
                    {termYears && (
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Term</p>
                        <p className="font-semibold">{termYears} years</p>
                      </div>
                    )}
                    {irr && (
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Target IRR</p>
                        <p className="font-semibold text-green-600">{irr}%</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Funding Progress</span>
                    <Badge variant={deal.status === "OPEN" ? "secondary" : "outline"}>
                      {deal.status === "OPEN" ? "Open" : deal.status === "FULLY_FUNDED" ? "Funded" : deal.status}
                    </Badge>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mb-3">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${Math.min(fundingProgress, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-muted-foreground">
                      {fundingProgress.toFixed(0)}% funded ({deal.investorCount} investor{deal.investorCount !== 1 ? "s" : ""})
                    </span>
                    <span className="font-semibold">${(availableAmount / 1000).toFixed(0)}k available</span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    disabled={deal.status !== "OPEN" || investing === deal.id}
                    onClick={() => handleInvest(deal.id, minInvestment)}
                  >
                    {investing === deal.id ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : deal.status === "OPEN" ? (
                      "Invest Now"
                    ) : (
                      "Fully Funded"
                    )}
                  </Button>
                </div>
              </div>
              {deal.description && (
                <p className="text-sm text-muted-foreground border-t border-border pt-4">
                  {deal.description}
                </p>
              )}
            </Card>
          )
        })}
      </div>

      {filteredDeals.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No deals found matching your search.</p>
        </Card>
      )}
    </div>
  )
}
