import { createClient } from "@/lib/supabase/server"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { sendApplicationSubmittedEmail } from "@/lib/email"

// Calculate monthly payment using amortization formula
function calculateMonthlyPayment(principal: number, annualRate: number, months: number): number {
  const monthlyRate = annualRate / 100 / 12
  if (monthlyRate === 0) return principal / months
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
}

// Generate proposals based on application data
function generateProposals(fundingNeeded: number) {
  const proposals = [
    {
      name: "Growth Accelerator",
      description: "Lower monthly payments, maximize cash flow during residency/early career",
      interestRate: 4.5,
      termMonths: 120, // 10 years
      betterOffScore: 92,
    },
    {
      name: "Balanced Growth",
      description: "Balanced approach with moderate payments and competitive rate",
      interestRate: 5.5,
      termMonths: 84, // 7 years
      betterOffScore: 88,
    },
    {
      name: "Wealth Builder",
      description: "Higher payments, build equity faster, lowest total interest",
      interestRate: 6.5,
      termMonths: 60, // 5 years
      betterOffScore: 85,
    },
  ]

  return proposals.map((p) => ({
    ...p,
    amount: fundingNeeded,
    monthlyPayment: calculateMonthlyPayment(fundingNeeded, p.interestRate, p.termMonths),
  }))
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user: supabaseUser } } = await supabase.auth.getUser()

  if (!supabaseUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { supabaseId: supabaseUser.id },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const applications = await db.fundingApplication.findMany({
    where: { userId: user.id },
    include: { proposals: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(applications)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user: supabaseUser } } = await supabase.auth.getUser()

  if (!supabaseUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { supabaseId: supabaseUser.id },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const body = await request.json()
  const {
    fullName,
    degree,
    specialty,
    yearsInPractice,
    estimatedIncome,
    medicalDebt,
    fundingNeeded,
    fundingTimeline,
    careerGoals,
    useOfFunds,
  } = body

  // Create application with generated proposals
  const fundingAmount = parseFloat(fundingNeeded) || 100000
  const proposalsData = generateProposals(fundingAmount)

  const application = await db.fundingApplication.create({
    data: {
      userId: user.id,
      fullName,
      degree,
      specialty,
      yearsInPractice: yearsInPractice ? parseInt(yearsInPractice) : null,
      estimatedIncome: estimatedIncome ? parseFloat(estimatedIncome) : null,
      medicalDebt: medicalDebt ? parseFloat(medicalDebt) : null,
      fundingNeeded: parseFloat(fundingAmount),
      fundingTimeline,
      careerGoals,
      useOfFunds,
      status: "SUBMITTED",
      submittedAt: new Date(),
      proposals: {
        create: proposalsData.map((p) => ({
          name: p.name,
          description: p.description,
          amount: parseFloat(p.amount),
          interestRate: parseFloat(p.interestRate),
          termMonths: p.termMonths,
          monthlyPayment: parseFloat(p.monthlyPayment),
          betterOffScore: p.betterOffScore,
        })),
      },
    },
    include: { proposals: true },
  })

  // Update physician profile
  await db.physicianProfile.upsert({
    where: { userId: user.id },
    update: {
      degree,
      specialty,
      yearsInPractice: yearsInPractice ? parseInt(yearsInPractice) : null,
      estimatedIncome: estimatedIncome ? parseFloat(estimatedIncome) : null,
      medicalSchoolDebt: medicalDebt ? parseFloat(medicalDebt) : null,
    },
    create: {
      userId: user.id,
      degree,
      specialty,
      yearsInPractice: yearsInPractice ? parseInt(yearsInPractice) : null,
      estimatedIncome: estimatedIncome ? parseFloat(estimatedIncome) : null,
      medicalSchoolDebt: medicalDebt ? parseFloat(medicalDebt) : null,
    },
  })

  // Send confirmation email
  try {
    await sendApplicationSubmittedEmail(user.email, fullName || user.name || "", application.id)
  } catch (emailError) {
    console.error("Failed to send application email:", emailError)
    // Don't fail the request if email fails
  }

  return NextResponse.json(application)
}
