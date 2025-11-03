"use client"

import type React from "react"

import Link from "next/link"
import { Card } from "@/components/ui/card"
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

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export default function WealthTools() {

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Wealth Building Tools</h2>
        <p className="text-muted-foreground">
          Access calculators, planners, and analysis tools to optimize your financial future
        </p>
      </div>

      {/* Tools Grid (compact 2x2, only 4 tools) */}
      <div className="grid grid-cols-2 gap-4 items-stretch">
        {tools.slice(0, 4).map((tool) => (
          <Link key={tool.title} href={`/tools/${toSlug(tool.title)}`} className="block h-full">
            <Card className="p-4 hover:border-primary transition cursor-pointer h-full">
              <div className="flex flex-col h-full">
                <div className="text-primary mb-2">{tool.icon}</div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-1 leading-tight">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </div>
                <div className="flex items-center justify-between text-xs mt-3">
                  <span className="font-medium px-2 py-1 bg-secondary rounded-full">{tool.category}</span>
                  <span className="text-primary font-medium">→</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
