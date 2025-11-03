"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface QuestionnaireData {
  fullName: string
  medicalDegree: string
  specialty: string
  yearsInPractice: number
  estimatedIncome: number
  currentDebt: number
  fundingNeeded: number
  fundingTimeline: string
  careerGoals: string
}

export default function PhysicianQuestionnaire({
  onSubmit,
}: {
  onSubmit: (data: QuestionnaireData) => void
}) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Partial<QuestionnaireData>>({})
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    {
      title: "Tell us about yourself",
      fields: ["fullName"],
    },
    {
      title: "Your Medical Background",
      fields: ["medicalDegree", "specialty"],
    },
    {
      title: "Your Practice",
      fields: ["yearsInPractice", "estimatedIncome"],
    },
    {
      title: "Financial Situation",
      fields: ["currentDebt", "fundingNeeded"],
    },
    {
      title: "Funding Goals",
      fields: ["fundingTimeline", "careerGoals"],
    },
  ]

  const currentStep = steps[step]
  const progress = ((step + 1) / steps.length) * 100

  const handleInputChange = (field: keyof QuestionnaireData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSubmit(data as QuestionnaireData)
    setIsLoading(false)
  }

  const isCurrentStepComplete = currentStep.fields.every((field) => data[field as keyof QuestionnaireData])

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">{currentStep.title}</h2>
          <span className="text-sm text-muted-foreground">
            Step {step + 1} of {steps.length}
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
          <div className="bg-primary h-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Form Content */}
      <Card className="p-8 mb-8">
        <div className="space-y-6">
          {currentStep.fields.includes("fullName") && (
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={data.fullName || ""}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Dr. Jane Smith"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          {currentStep.fields.includes("medicalDegree") && (
            <div>
              <label className="block text-sm font-medium mb-2">Medical Degree</label>
              <select
                value={data.medicalDegree || ""}
                onChange={(e) => handleInputChange("medicalDegree", e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select degree</option>
                <option value="MD">MD (Doctor of Medicine)</option>
                <option value="DO">DO (Doctor of Osteopathic Medicine)</option>
                <option value="DDS">DDS (Doctor of Dental Surgery)</option>
                <option value="DMD">DMD (Doctor of Dental Medicine)</option>
              </select>
            </div>
          )}

          {currentStep.fields.includes("specialty") && (
            <div>
              <label className="block text-sm font-medium mb-2">Specialty</label>
              <select
                value={data.specialty || ""}
                onChange={(e) => handleInputChange("specialty", e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select specialty</option>
                <option value="General Practice">General Practice</option>
                <option value="Surgery">Surgery</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Radiology">Radiology</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {currentStep.fields.includes("yearsInPractice") && (
            <div>
              <label className="block text-sm font-medium mb-2">Years in Practice</label>
              <input
                type="number"
                min="0"
                max="60"
                value={data.yearsInPractice || ""}
                onChange={(e) => handleInputChange("yearsInPractice", Number.parseInt(e.target.value))}
                placeholder="0"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          {currentStep.fields.includes("estimatedIncome") && (
            <div>
              <label className="block text-sm font-medium mb-2">Estimated Annual Income</label>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">$</span>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={data.estimatedIncome || ""}
                  onChange={(e) => handleInputChange("estimatedIncome", Number.parseInt(e.target.value))}
                  placeholder="250000"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {currentStep.fields.includes("currentDebt") && (
            <div>
              <label className="block text-sm font-medium mb-2">Current Medical School Debt</label>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">$</span>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={data.currentDebt || ""}
                  onChange={(e) => handleInputChange("currentDebt", Number.parseInt(e.target.value))}
                  placeholder="150000"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {currentStep.fields.includes("fundingNeeded") && (
            <div>
              <label className="block text-sm font-medium mb-2">Funding Needed (up to $300k)</label>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">$</span>
                <input
                  type="number"
                  min="0"
                  max="300000"
                  step="10000"
                  value={data.fundingNeeded || ""}
                  onChange={(e) => handleInputChange("fundingNeeded", Number.parseInt(e.target.value))}
                  placeholder="100000"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {currentStep.fields.includes("fundingTimeline") && (
            <div>
              <label className="block text-sm font-medium mb-2">When do you need the funding?</label>
              <select
                value={data.fundingTimeline || ""}
                onChange={(e) => handleInputChange("fundingTimeline", e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select timeline</option>
                <option value="Immediately">Immediately (within 1 month)</option>
                <option value="Short-term">Short-term (1-3 months)</option>
                <option value="Medium-term">Medium-term (3-6 months)</option>
                <option value="Long-term">Long-term (6+ months)</option>
              </select>
            </div>
          )}

          {currentStep.fields.includes("careerGoals") && (
            <div>
              <label className="block text-sm font-medium mb-2">What are your primary career goals?</label>
              <textarea
                value={data.careerGoals || ""}
                onChange={(e) => handleInputChange("careerGoals", e.target.value)}
                placeholder="e.g., Build my practice, invest in equipment, expand to multiple locations..."
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex gap-4 justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={step === 0} className="gap-2 bg-transparent">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!isCurrentStepComplete || isLoading} className="gap-2">
          {step === steps.length - 1 ? "Generate Proposals" : "Next"}
          {step < steps.length - 1 && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
