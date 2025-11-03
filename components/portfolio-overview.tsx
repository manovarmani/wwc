"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface PortfolioPosition {
  id: string
  physicianName: string
  specialty: string
  investmentAmount: number
  currentValue: number
  returnPercentage: number
  status: "active" | "funded" | "repaying"
  interestRate: number
  nextDistribution: string
}

const positions: PortfolioPosition[] = [
  {
    id: "1",
    physicianName: "Dr. Emily Chen",
    specialty: "Cardiology",
    investmentAmount: 125000,
    currentValue: 143750,
    returnPercentage: 15,
    status: "active",
    interestRate: 4.5,
    nextDistribution: "Jan 15, 2025",
  },
  {
    id: "2",
    physicianName: "Dr. Marcus Thompson",
    specialty: "Orthopedic Surgery",
    investmentAmount: 150000,
    currentValue: 171000,
    returnPercentage: 14,
    status: "repaying",
    interestRate: 5.5,
    nextDistribution: "Jan 20, 2025",
  },
  {
    id: "3",
    physicianName: "Dr. Sarah Williams",
    specialty: "Radiology",
    investmentAmount: 100000,
    currentValue: 118000,
    returnPercentage: 18,
    status: "funded",
    interestRate: 6.5,
    nextDistribution: "Jan 25, 2025",
  },
  {
    id: "4",
    physicianName: "Dr. James Rodriguez",
    specialty: "General Practice",
    investmentAmount: 200000,
    currentValue: 228000,
    returnPercentage: 14,
    status: "active",
    interestRate: 4.5,
    nextDistribution: "Feb 5, 2025",
  },
]

export default function PortfolioOverview() {
  return (
    <div className="space-y-6">
      {/* Portfolio Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Portfolio Allocation by Status</h3>
          <div className="space-y-4">
            {[
              { label: "Active", value: 50, color: "bg-primary" },
              { label: "Repaying", value: 35, color: "bg-green-500" },
              { label: "Funded", value: 15, color: "bg-blue-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-6">Return Distribution</h3>
          <div className="space-y-4">
            {[
              { label: "This Quarter", value: "$32.1k" },
              { label: "Last Quarter", value: "$28.3k" },
              { label: "Two Quarters Ago", value: "$24.1k" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Individual Positions */}
      <div>
        <h3 className="font-semibold mb-4">Your Positions</h3>
        <div className="space-y-3">
          {positions.map((position) => (
            <Card key={position.id} className="p-4 hover:border-primary transition cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{position.physicianName}</h4>
                    <Badge
                      variant={
                        position.status === "active"
                          ? "default"
                          : position.status === "repaying"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {position.status === "active" ? "Active" : position.status === "repaying" ? "Repaying" : "Funded"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{position.specialty}</p>

                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Invested</p>
                      <p className="font-semibold">${(position.investmentAmount / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Current Value</p>
                      <p className="font-semibold">${(position.currentValue / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Return</p>
                      <p className="font-semibold text-green-600">+{position.returnPercentage}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Next Distribution</p>
                      <p className="font-semibold text-primary">{position.nextDistribution}</p>
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
