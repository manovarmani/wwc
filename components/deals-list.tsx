"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface Deal {
  id: string
  physicianName: string
  specialty: string
  loanAmount: number
  interestRate: number
  term: number
  expectedIRR: number
  riskScore: "Low" | "Medium" | "High"
  fundingProgress: number
  availableAmount: number
}

const deals: Deal[] = [
  {
    id: "1",
    physicianName: "Dr. Lisa Anderson",
    specialty: "Pediatrics",
    loanAmount: 150000,
    interestRate: 5.5,
    term: 7,
    expectedIRR: 12.5,
    riskScore: "Low",
    fundingProgress: 75,
    availableAmount: 37500,
  },
  {
    id: "2",
    physicianName: "Dr. David Kumar",
    specialty: "Psychiatry",
    loanAmount: 120000,
    interestRate: 6.0,
    term: 5,
    expectedIRR: 14.2,
    riskScore: "Medium",
    fundingProgress: 60,
    availableAmount: 48000,
  },
  {
    id: "3",
    physicianName: "Dr. Rachel Green",
    specialty: "Gastroenterology",
    loanAmount: 200000,
    interestRate: 5.0,
    term: 6,
    expectedIRR: 11.8,
    riskScore: "Low",
    fundingProgress: 85,
    availableAmount: 30000,
  },
]

export default function DealsList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDeals = deals.filter(
    (deal) =>
      deal.physicianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-secondary/30">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by physician name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      {/* Deals */}
      <div className="space-y-3">
        {filteredDeals.map((deal) => (
          <Card key={deal.id} className="p-6 hover:border-primary transition">
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 className="font-semibold mb-1">{deal.physicianName}</h4>
                <p className="text-sm text-muted-foreground mb-4">{deal.specialty}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Loan Amount</p>
                    <p className="font-semibold">${(deal.loanAmount / 1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Interest Rate</p>
                    <p className="font-semibold">{deal.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Term</p>
                    <p className="font-semibold">{deal.term} years</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Expected IRR</p>
                    <p className="font-semibold text-green-600">{deal.expectedIRR}%</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Funding Progress</span>
                  <Badge
                    variant={
                      deal.riskScore === "Low" ? "secondary" : deal.riskScore === "Medium" ? "outline" : "destructive"
                    }
                  >
                    {deal.riskScore} Risk
                  </Badge>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 mb-3">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ width: `${deal.fundingProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-muted-foreground">{deal.fundingProgress}% funded</span>
                  <span className="font-semibold">${(deal.availableAmount / 1000).toFixed(0)}k available</span>
                </div>
                <Button size="sm" className="w-full">
                  Invest Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredDeals.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No deals found matching your search.</p>
        </Card>
      )}
    </div>
  )
}
