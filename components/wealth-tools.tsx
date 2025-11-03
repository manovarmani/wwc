"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, TrendingUp, PieChart, Target, DollarSign, Calendar } from "lucide-react"

interface Tool {
  icon: React.ReactNode
  title: string
  description: string
  category: string
}

const tools: Tool[] = [
  {
    icon: <Calculator className="h-8 w-8" />,
    title: "Loan Payoff Calculator",
    description: "Calculate your loan payoff timeline and visualize how extra payments can accelerate debt elimination",
    category: "Calculators",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Investment Return Simulator",
    description: "Project your returns based on different investment amounts, rates, and time horizons",
    category: "Simulators",
  },
  {
    icon: <PieChart className="h-8 w-8" />,
    title: "Portfolio Optimizer",
    description: "Get personalized asset allocation recommendations based on your risk profile",
    category: "Analysis",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Financial Goal Planner",
    description: "Set financial milestones and create actionable plans to achieve them",
    category: "Planning",
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Cash Flow Analyzer",
    description: "Track and optimize your monthly cash flow with detailed expense categorization",
    category: "Analysis",
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: "Retirement Planner",
    description: "Plan for your retirement with projections based on various savings and investment scenarios",
    category: "Planning",
  },
]

export default function WealthTools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const handleToolClick = (title: string) => {
    setSelectedTool(title)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Wealth Building Tools</h2>
        <p className="text-muted-foreground">
          Access calculators, planners, and analysis tools to optimize your financial future
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card
            key={tool.title}
            className={`p-6 hover:border-primary transition cursor-pointer ${
              selectedTool === tool.title ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleToolClick(tool.title)}
          >
            <div className="text-primary mb-4">{tool.icon}</div>
            <h3 className="text-lg font-bold mb-2">{tool.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-full">{tool.category}</span>
              <span className="text-primary font-medium">→</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Tool View */}
      {selectedTool && (
        <Card className="p-8 bg-secondary/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">{selectedTool}</h3>
            <Button variant="outline" onClick={() => setSelectedTool(null)}>
              Close
            </Button>
          </div>

          {selectedTool === "Loan Payoff Calculator" && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Principal Amount</label>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">$</span>
                    <input
                      type="number"
                      defaultValue="150000"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                  <input
                    type="number"
                    defaultValue="4.5"
                    step="0.1"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Loan Term (years)</label>
                  <input
                    type="number"
                    defaultValue="7"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Extra Monthly Payment</label>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">$</span>
                    <input
                      type="number"
                      defaultValue="500"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
              <Button className="w-full">Calculate Payoff Timeline</Button>
            </div>
          )}

          {selectedTool !== "Loan Payoff Calculator" && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground mb-6">Interactive tool interface for {selectedTool}</p>
              <Button className="gap-2">
                Launch Tool <TrendingUp className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
