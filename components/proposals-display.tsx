"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react"

interface Proposal {
  id: string
  name: string
  amount: string
  interestRate: string
  termMonths: number
  monthlyPayment: string
  betterOffScore: number | null
  description: string | null
}

interface Application {
  id: string
  fullName: string | null
  proposals: Proposal[]
}

export default function ProposalsDisplay({
  application,
  onReset,
}: {
  application: Application
  onReset: () => void
}) {
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null)
  const [isAccepting, setIsAccepting] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const router = useRouter()

  const proposals = application.proposals

  const handleSelect = (id: string) => {
    setSelectedProposalId(id)
  }

  const handleAccept = async () => {
    if (!selectedProposalId) return

    setIsAccepting(true)
    try {
      const response = await fetch(`/api/applications/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedProposalId }),
      })

      if (response.ok) {
        setAccepted(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
    } catch {
      // Handle error
    } finally {
      setIsAccepting(false)
    }
  }

  const selectedProposal = proposals.find((p) => p.id === selectedProposalId)

  // Helper functions for formatting
  const formatCurrency = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value
    return (num / 1000).toFixed(0)
  }

  const formatMonthly = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value
    return num.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }

  const getKeyBenefits = (name: string): string[] => {
    switch (name) {
      case "Growth Accelerator":
        return [
          "Lowest interest rate",
          "Flexible repayment based on income",
          "Ideal for practice expansion",
          "Career milestone flexibility",
        ]
      case "Balanced Growth":
        return [
          "Balanced interest rate",
          "Shorter payoff timeline",
          "Fixed payments for stability",
          "Tax-efficient structure",
        ]
      case "Wealth Builder":
        return [
          "Rapid wealth accumulation",
          "Shorter debt burden",
          "Aggressive payment plan",
          "Premium returns for investors",
        ]
      default:
        return []
    }
  }

  if (accepted) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Proposal Accepted!</h3>
        <p className="text-muted-foreground mb-6">
          Your funding application has been submitted. Redirecting to your dashboard...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Your Tailored Funding Proposals</h1>
        <p className="text-lg text-muted-foreground">
          {`We've created 3 proposals that pass our Better-Off Test for ${application.fullName || "you"}`}
        </p>
      </div>

      {/* Proposals Grid */}
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        {proposals.map((proposal) => {
          const amount = parseFloat(proposal.amount)
          const interestRate = parseFloat(proposal.interestRate)
          const monthlyPayment = parseFloat(proposal.monthlyPayment)
          const termYears = Math.round(proposal.termMonths / 12)
          const totalRepayment = monthlyPayment * proposal.termMonths

          return (
            <Card
              key={proposal.id}
              className={`p-6 cursor-pointer transition-all ${
                selectedProposalId === proposal.id ? "ring-2 ring-primary border-primary" : "hover:border-primary"
              }`}
              onClick={() => handleSelect(proposal.id)}
            >
              {/* Proposal Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{proposal.name}</h3>
                <p className="text-sm text-muted-foreground">{proposal.description}</p>
              </div>

              {/* Key Metrics */}
              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Loan Amount</span>
                    <span className="text-lg font-bold text-primary">${formatCurrency(amount)}k</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Interest Rate</span>
                    <span className="text-lg font-bold">{interestRate.toFixed(1)}%</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Payment</span>
                    <span className="text-lg font-bold">${formatMonthly(monthlyPayment)}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Payoff Period</span>
                    <span className="text-lg font-bold">{termYears} years</span>
                  </div>
                </div>
              </div>

              {/* Better-Off Score */}
              <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Better-Off Score</span>
                  <span className="text-2xl font-bold text-primary">{proposal.betterOffScore || 85}/100</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ width: `${proposal.betterOffScore || 85}%` }}
                  />
                </div>
              </div>

              {/* Key Benefits */}
              <div className="mb-6 space-y-2">
                {getKeyBenefits(proposal.name).map((benefit, idx) => (
                  <div key={idx} className="flex gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button className="w-full gap-2" variant={selectedProposalId === proposal.id ? "default" : "outline"}>
                {selectedProposalId === proposal.id ? "Selected" : "Select"} <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>
          )
        })}
      </div>

      {/* Selected Proposal Details */}
      {selectedProposal && (
        <Card className="p-8 bg-secondary/30">
          <div>
            <h2 className="text-2xl font-bold mb-6">{selectedProposal.name} - Detailed Overview</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Loan Amount</div>
                  <div className="text-3xl font-bold text-primary">
                    ${formatCurrency(selectedProposal.amount)}k
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Interest Rate (Annual)</div>
                  <div className="text-3xl font-bold">{parseFloat(selectedProposal.interestRate).toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Repayment Term</div>
                  <div className="text-3xl font-bold">{Math.round(selectedProposal.termMonths / 12)} Years</div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Monthly Payment</div>
                  <div className="text-3xl font-bold">${formatMonthly(selectedProposal.monthlyPayment)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total Repayment</div>
                  <div className="text-3xl font-bold">
                    ${formatCurrency(parseFloat(selectedProposal.monthlyPayment) * selectedProposal.termMonths)}k
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total Interest Paid</div>
                  <div className="text-3xl font-bold">
                    ${formatCurrency(
                      parseFloat(selectedProposal.monthlyPayment) * selectedProposal.termMonths -
                        parseFloat(selectedProposal.amount)
                    )}k
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="flex-1"
                size="lg"
                onClick={handleAccept}
                disabled={isAccepting}
              >
                {isAccepting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Accept This Proposal"
                )}
              </Button>
              <Button variant="outline" size="lg" onClick={() => setSelectedProposalId(null)}>
                Compare Others
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Footer Actions */}
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={onReset}>
          Start Over
        </Button>
      </div>
    </div>
  )
}
