import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, TrendingUp } from "lucide-react"

const slugToTitle: Record<string, string> = {
  "loan-payoff-calculator": "Loan Payoff Calculator",
  "investment-return-simulator": "Investment Return Simulator",
  "portfolio-optimizer": "Portfolio Optimizer",
  "financial-goal-planner": "Financial Goal Planner",
  "cash-flow-analyzer": "Cash Flow Analyzer",
  "retirement-planner": "Retirement Planner",
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const title = slugToTitle[slug] ?? "Wealth Tool"
  const isLoanCalculator = slug === "loan-payoff-calculator"

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/tools" className="flex items-center gap-2 hover:opacity-80 transition">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="text-sm text-muted-foreground">Wealth Tools</div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground">Interactive tool</p>
        </div>

        <Card className="p-6">
          {isLoanCalculator ? (
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
                    step={0.1}
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
          ) : (
            <div className="py-10 text-center">
              <p className="text-muted-foreground mb-6">Interactive tool interface for {title}</p>
              <Button className="gap-2">
                Launch Tool <TrendingUp className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </main>
  )
}


