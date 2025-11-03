"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

interface ProposalData {
  fullName: string
  specialty: string
  fundingNeeded: number
  estimatedIncome: number
  currentDebt: number
  careerGoals: string
}

interface Proposal {
  id: number
  name: string
  loanAmount: number
  interestRate: number
  repaymentTermYears: number
  monthlyPayment: number
  totalRepayment: number
  structure: string
  keyBenefits: string[]
  betterOffScore: number
  description: string
}

function generateProposals(data: ProposalData): Proposal[] {
  const income = data.estimatedIncome
  const fundingNeeded = data.fundingNeeded
  const yearsOfRepayment = income > 250000 ? 5 : income > 150000 ? 7 : 10

  // Proposal 1: Growth-Focused (Lower interest, longer term)
  const growth = {
    id: 1,
    name: "Growth Accelerator",
    loanAmount: fundingNeeded,
    interestRate: 4.5,
    repaymentTermYears: yearsOfRepayment,
    monthlyPayment:
      (fundingNeeded * (0.045 / 12) * Math.pow(1 + 0.045 / 12, yearsOfRepayment * 12)) /
      (Math.pow(1 + 0.045 / 12, yearsOfRepayment * 12) - 1),
    totalRepayment: 0,
    structure: "Income-based repayment",
    keyBenefits: [
      "Lowest interest rate at 4.5%",
      "Flexible repayment based on income",
      "Ideal for practice expansion",
      "Career milestone flexibility",
    ],
    betterOffScore: 92,
    description: "Designed for physicians focused on practice growth and expansion",
  }
  growth.totalRepayment = growth.monthlyPayment * growth.repaymentTermYears * 12

  // Proposal 2: Balanced (Mid-range terms)
  const balanced = {
    id: 2,
    name: "Balanced Growth",
    loanAmount: fundingNeeded,
    interestRate: 5.5,
    repaymentTermYears: Math.round(yearsOfRepayment * 0.8),
    monthlyPayment: 0,
    totalRepayment: 0,
    structure: "Fixed + variable blend",
    keyBenefits: [
      "Balanced interest rate at 5.5%",
      "Shorter payoff timeline",
      "Fixed payments for stability",
      "Tax-efficient structure",
    ],
    betterOffScore: 85,
    description: "Perfect for physicians seeking stability with moderate returns",
  }
  const term = balanced.repaymentTermYears
  balanced.monthlyPayment =
    (fundingNeeded * (0.055 / 12) * Math.pow(1 + 0.055 / 12, term * 12)) / (Math.pow(1 + 0.055 / 12, term * 12) - 1)
  balanced.totalRepayment = balanced.monthlyPayment * term * 12

  // Proposal 3: Wealth-Building (Higher interest, shorter term)
  const wealth = {
    id: 3,
    name: "Wealth Builder",
    loanAmount: fundingNeeded,
    interestRate: 6.5,
    repaymentTermYears: Math.max(3, Math.round(yearsOfRepayment * 0.5)),
    monthlyPayment: 0,
    totalRepayment: 0,
    structure: "Accelerated equity build",
    keyBenefits: [
      "Rapid wealth accumulation",
      "Shorter debt burden (3-5 years)",
      "Aggressive payment plan",
      "Premium returns for investors",
    ],
    betterOffScore: 78,
    description: "For physicians with strong cash flow seeking rapid debt elimination",
  }
  const wealthTerm = wealth.repaymentTermYears
  wealth.monthlyPayment =
    (fundingNeeded * (0.065 / 12) * Math.pow(1 + 0.065 / 12, wealthTerm * 12)) /
    (Math.pow(1 + 0.065 / 12, wealthTerm * 12) - 1)
  wealth.totalRepayment = wealth.monthlyPayment * wealthTerm * 12

  return [growth, balanced, wealth]
}

export default function ProposalsDisplay({
  data,
  onReset,
}: {
  data: ProposalData
  onReset: () => void
}) {
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null)
  const proposals = generateProposals(data)

  const handleSelect = (id: number) => {
    setSelectedProposal(id)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Your Tailored Funding Proposals</h1>
        <p className="text-lg text-muted-foreground">
          {`We've created 3 proposals that pass our Better-Off Test for ${data.fullName}`}
        </p>
      </div>

      {/* Proposals Grid */}
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        {proposals.map((proposal) => (
          <Card
            key={proposal.id}
            className={`p-6 cursor-pointer transition-all ${
              selectedProposal === proposal.id ? "ring-2 ring-primary border-primary" : "hover:border-primary"
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
                  <span className="text-lg font-bold text-primary">${(proposal.loanAmount / 1000).toFixed(0)}k</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Interest Rate</span>
                  <span className="text-lg font-bold">{proposal.interestRate.toFixed(1)}%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Monthly Payment</span>
                  <span className="text-lg font-bold">${(proposal.monthlyPayment / 1000).toFixed(1)}k</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payoff Period</span>
                  <span className="text-lg font-bold">{proposal.repaymentTermYears} years</span>
                </div>
              </div>
            </div>

            {/* Better-Off Score */}
            <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Better-Off Score</span>
                <span className="text-2xl font-bold text-primary">{proposal.betterOffScore}/100</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{ width: `${proposal.betterOffScore}%` }}
                />
              </div>
            </div>

            {/* Key Benefits */}
            <div className="mb-6 space-y-2">
              {proposal.keyBenefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button className="w-full gap-2" variant={selectedProposal === proposal.id ? "default" : "outline"}>
              {selectedProposal === proposal.id ? "Selected" : "Select"} <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>

      {/* Selected Proposal Details */}
      {selectedProposal && (
        <Card className="p-8 bg-secondary/30">
          {selectedProposal &&
            proposals
              .filter((p) => p.id === selectedProposal)
              .map((proposal) => (
                <div key={proposal.id}>
                  <h2 className="text-2xl font-bold mb-6">{proposal.name} - Detailed Overview</h2>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Loan Amount</div>
                        <div className="text-3xl font-bold text-primary">
                          ${(proposal.loanAmount / 1000).toFixed(0)}k
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Interest Rate (Annual)</div>
                        <div className="text-3xl font-bold">{proposal.interestRate.toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Repayment Term</div>
                        <div className="text-3xl font-bold">{proposal.repaymentTermYears} Years</div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Monthly Payment</div>
                        <div className="text-3xl font-bold">${(proposal.monthlyPayment / 1000).toFixed(1)}k</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Total Repayment</div>
                        <div className="text-3xl font-bold">${(proposal.totalRepayment / 1000).toFixed(0)}k</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Total Interest Paid</div>
                        <div className="text-3xl font-bold">
                          ${((proposal.totalRepayment - proposal.loanAmount) / 1000).toFixed(0)}k
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Repayment Structure */}
                  <div className="p-4 bg-background rounded-lg mb-8">
                    <h3 className="font-semibold mb-4">Repayment Structure: {proposal.structure}</h3>
                    <p className="text-sm text-muted-foreground">
                      This proposal uses a {proposal.structure.toLowerCase()} approach, designed to align your cash flow
                      with your career trajectory. Payments are calculated to be manageable while ensuring strong
                      returns for investors.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button className="flex-1" size="lg">
                      Accept This Proposal
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setSelectedProposal(null)}>
                      Compare Others
                    </Button>
                  </div>
                </div>
              ))}
        </Card>
      )}

      {/* Footer Actions */}
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={onReset}>
          Start Over
        </Button>
        <Button className="gap-2">
          Continue to Next Step <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
