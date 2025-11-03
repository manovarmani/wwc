"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import PhysicianQuestionnaire from "@/components/physician-questionnaire"
import ProposalsDisplay from "@/components/proposals-display"
import { Logo } from "@/components/logo"

export default function PhysicianPage() {
  const [step, setStep] = useState<"questionnaire" | "proposals">("questionnaire")
  const [proposalData, setProposalData] = useState(null)

  const handleQuestionnaire = (data: any) => {
    setProposalData(data)
    setStep("proposals")
  }

  const handleReset = () => {
    setStep("questionnaire")
    setProposalData(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === "questionnaire" && <PhysicianQuestionnaire onSubmit={handleQuestionnaire} />}
        {step === "proposals" && proposalData && <ProposalsDisplay data={proposalData} onReset={handleReset} />}
      </div>
    </main>
  )
}
