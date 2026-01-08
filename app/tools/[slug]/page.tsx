"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, TrendingUp, Calculator, DollarSign, Clock, Percent } from "lucide-react"

const slugToTitle: Record<string, string> = {
  "loan-payoff-calculator": "Loan Payoff Calculator",
  "investment-return-simulator": "Investment Return Simulator",
  "portfolio-optimizer": "Portfolio Optimizer",
  "financial-goal-planner": "Financial Goal Planner",
  "cash-flow-analyzer": "Cash Flow Analyzer",
  "retirement-planner": "Retirement Planner",
}

interface CalculationResult {
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
  payoffMonths: number
  payoffYears: number
  savedMonths: number
  savedInterest: number
}

export default function ToolPage() {
  const params = useParams()
  const slug = params.slug as string
  const title = slugToTitle[slug] ?? "Wealth Tool"
  const isLoanCalculator = slug === "loan-payoff-calculator"
  const isInvestmentSimulator = slug === "investment-return-simulator"
  const isRetirementPlanner = slug === "retirement-planner"

  // Loan Calculator State
  const [principal, setPrincipal] = useState("150000")
  const [interestRate, setInterestRate] = useState("4.5")
  const [loanTerm, setLoanTerm] = useState("7")
  const [extraPayment, setExtraPayment] = useState("500")
  const [loanResult, setLoanResult] = useState<CalculationResult | null>(null)

  // Investment Simulator State
  const [initialInvestment, setInitialInvestment] = useState("50000")
  const [monthlyContribution, setMonthlyContribution] = useState("1000")
  const [expectedReturn, setExpectedReturn] = useState("8")
  const [investmentYears, setInvestmentYears] = useState("20")
  const [investmentResult, setInvestmentResult] = useState<{
    futureValue: number
    totalContributions: number
    totalGains: number
  } | null>(null)

  // Retirement Planner State
  const [currentAge, setCurrentAge] = useState("35")
  const [retirementAge, setRetirementAge] = useState("65")
  const [currentSavings, setCurrentSavings] = useState("100000")
  const [monthlyRetirementContribution, setMonthlyRetirementContribution] = useState("2000")
  const [retirementResult, setRetirementResult] = useState<{
    projectedSavings: number
    monthlyRetirementIncome: number
    yearsOfRetirement: number
  } | null>(null)

  const calculateLoanPayoff = () => {
    const p = parseFloat(principal)
    const r = parseFloat(interestRate) / 100 / 12
    const n = parseFloat(loanTerm) * 12
    const extra = parseFloat(extraPayment)

    // Standard monthly payment (without extra)
    const standardMonthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const standardTotalPayment = standardMonthlyPayment * n
    const standardTotalInterest = standardTotalPayment - p

    // Calculate with extra payments
    let balance = p
    let months = 0
    let totalPaid = 0
    const monthlyWithExtra = standardMonthlyPayment + extra

    while (balance > 0 && months < n * 2) {
      const interestPayment = balance * r
      const principalPayment = Math.min(monthlyWithExtra - interestPayment, balance)
      balance -= principalPayment
      totalPaid += principalPayment + interestPayment
      months++
    }

    const savedMonths = n - months
    const savedInterest = standardTotalInterest - (totalPaid - p)

    setLoanResult({
      monthlyPayment: standardMonthlyPayment,
      totalInterest: totalPaid - p,
      totalPayment: totalPaid,
      payoffMonths: months,
      payoffYears: Math.floor(months / 12),
      savedMonths: Math.max(0, savedMonths),
      savedInterest: Math.max(0, savedInterest),
    })
  }

  const calculateInvestmentReturn = () => {
    const initial = parseFloat(initialInvestment)
    const monthly = parseFloat(monthlyContribution)
    const rate = parseFloat(expectedReturn) / 100 / 12
    const months = parseFloat(investmentYears) * 12

    // Future value with compound interest
    const futureValueInitial = initial * Math.pow(1 + rate, months)
    const futureValueContributions = monthly * ((Math.pow(1 + rate, months) - 1) / rate)
    const futureValue = futureValueInitial + futureValueContributions
    const totalContributions = initial + monthly * months
    const totalGains = futureValue - totalContributions

    setInvestmentResult({
      futureValue,
      totalContributions,
      totalGains,
    })
  }

  const calculateRetirement = () => {
    const age = parseInt(currentAge)
    const retireAge = parseInt(retirementAge)
    const savings = parseFloat(currentSavings)
    const monthly = parseFloat(monthlyRetirementContribution)
    const yearsToRetirement = retireAge - age
    const rate = 0.07 / 12 // Assume 7% annual return

    const months = yearsToRetirement * 12
    const futureValueSavings = savings * Math.pow(1 + rate, months)
    const futureValueContributions = monthly * ((Math.pow(1 + rate, months) - 1) / rate)
    const projectedSavings = futureValueSavings + futureValueContributions

    // Assume 4% withdrawal rate and 25 years of retirement
    const monthlyRetirementIncome = (projectedSavings * 0.04) / 12

    setRetirementResult({
      projectedSavings,
      monthlyRetirementIncome,
      yearsOfRetirement: 25,
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

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
          <p className="text-muted-foreground">Interactive financial planning tool</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Input Parameters
            </h2>
            {isLoanCalculator && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Principal Amount</label>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">$</span>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    step={0.1}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Loan Term (years)</label>
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Extra Monthly Payment</label>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">$</span>
                    <input
                      type="number"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    />
                  </div>
                </div>
                <Button className="w-full" onClick={calculateLoanPayoff}>
                  Calculate Payoff Timeline
                </Button>
              </div>
            )}

            {isInvestmentSimulator && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Initial Investment</label>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">$</span>
                    <input
                      type="number"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Contribution</label>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">$</span>
                    <input
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Expected Annual Return (%)</label>
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    step={0.1}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Investment Period (years)</label>
                  <input
                    type="number"
                    value={investmentYears}
                    onChange={(e) => setInvestmentYears(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>
                <Button className="w-full" onClick={calculateInvestmentReturn}>
                  Calculate Returns
                </Button>
              </div>
            )}

            {isRetirementPlanner && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Age</label>
                  <input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Target Retirement Age</label>
                  <input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Current Retirement Savings</label>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">$</span>
                    <input
                      type="number"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Contribution</label>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">$</span>
                    <input
                      type="number"
                      value={monthlyRetirementContribution}
                      onChange={(e) => setMonthlyRetirementContribution(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    />
                  </div>
                </div>
                <Button className="w-full" onClick={calculateRetirement}>
                  Calculate Retirement Plan
                </Button>
              </div>
            )}

            {!isLoanCalculator && !isInvestmentSimulator && !isRetirementPlanner && (
              <div className="py-10 text-center">
                <p className="text-muted-foreground mb-6">Interactive tool interface for {title}</p>
                <Button className="gap-2" onClick={() => alert("Tool coming soon!")}>
                  Launch Tool <TrendingUp className="h-4 w-4" />
                </Button>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Results</h2>

            {isLoanCalculator && loanResult && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm">Monthly Payment</span>
                    </div>
                    <p className="text-2xl font-bold">{formatCurrency(loanResult.monthlyPayment)}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Payoff Time</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {loanResult.payoffYears}y {loanResult.payoffMonths % 12}m
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="font-semibold">{formatCurrency(loanResult.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Payment</span>
                    <span className="font-semibold">{formatCurrency(loanResult.totalPayment)}</span>
                  </div>
                </div>

                {loanResult.savedMonths > 0 && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <h3 className="font-semibold text-primary mb-2">Savings with Extra Payments</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Time Saved</span>
                        <span className="font-semibold">{Math.floor(loanResult.savedMonths)} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Saved</span>
                        <span className="font-semibold text-primary">{formatCurrency(loanResult.savedInterest)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isInvestmentSimulator && investmentResult && (
              <div className="space-y-6">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Future Value</p>
                  <p className="text-4xl font-bold text-primary">{formatCurrency(investmentResult.futureValue)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm">Total Contributions</span>
                    </div>
                    <p className="text-xl font-bold">{formatCurrency(investmentResult.totalContributions)}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">Investment Gains</span>
                    </div>
                    <p className="text-xl font-bold text-primary">{formatCurrency(investmentResult.totalGains)}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Return on Investment</span>
                    <span className="font-semibold text-primary">
                      {((investmentResult.totalGains / investmentResult.totalContributions) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {isRetirementPlanner && retirementResult && (
              <div className="space-y-6">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Projected Retirement Savings</p>
                  <p className="text-4xl font-bold text-primary">{formatCurrency(retirementResult.projectedSavings)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm">Monthly Income</span>
                    </div>
                    <p className="text-xl font-bold">{formatCurrency(retirementResult.monthlyRetirementIncome)}</p>
                    <p className="text-xs text-muted-foreground">Based on 4% withdrawal rate</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Retirement Years</span>
                    </div>
                    <p className="text-xl font-bold">{retirementResult.yearsOfRetirement}</p>
                    <p className="text-xs text-muted-foreground">Estimated coverage</p>
                  </div>
                </div>
              </div>
            )}

            {!loanResult && !investmentResult && !retirementResult && (
              <div className="py-20 text-center text-muted-foreground">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>Enter your parameters and click calculate to see results</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </main>
  )
}
