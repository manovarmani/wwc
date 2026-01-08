import { createClient } from "@/lib/supabase/server"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data: { user: supabaseUser } } = await supabase.auth.getUser()

  if (!supabaseUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { supabaseId: supabaseUser.id },
    include: {
      physicianProfile: true,
      investorProfile: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  if (user.role === "PHYSICIAN") {
    // Get physician dashboard data
    const applications = await db.fundingApplication.findMany({
      where: { userId: user.id },
      include: { proposals: true },
      orderBy: { createdAt: "desc" },
    })

    const latestApplication = applications[0]
    const selectedProposal = latestApplication?.proposals.find(
      (p) => p.id === latestApplication.selectedProposalId
    )

    // Calculate metrics
    const activeFunding = selectedProposal ? Number(selectedProposal.amount) : 0
    const monthlyPayment = selectedProposal ? Number(selectedProposal.monthlyPayment) : 0
    const interestRate = selectedProposal ? Number(selectedProposal.interestRate) : 0

    // Simulated portfolio value (in a real app, this would come from actual investments)
    const portfolioValue = activeFunding * 1.15 // 15% appreciation example

    return NextResponse.json({
      user,
      role: "PHYSICIAN",
      metrics: {
        activeFunding,
        monthlyPayment,
        portfolioValue,
        interestRate,
      },
      applications,
      latestApplication,
      selectedProposal,
    })
  } else if (user.role === "INVESTOR") {
    // Get investor dashboard data
    const investments = await db.investment.findMany({
      where: { userId: user.id },
      include: {
        deal: true,
        distributions: true,
      },
    })

    // Calculate metrics
    const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0)
    const currentValue = investments.reduce((sum, inv) => sum + Number(inv.currentValue), 0)
    const totalDistributions = investments.reduce(
      (sum, inv) => sum + inv.distributions.reduce((dSum, d) => dSum + Number(d.amount), 0),
      0
    )

    // Calculate IRR (simplified - in real app would use proper IRR calculation)
    const ytdReturn = totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested) * 100 : 0
    const portfolioIRR = ytdReturn * 1.2 // Approximate annualized

    // Group investments by specialty
    const bySpecialty = investments.reduce(
      (acc, inv) => {
        const specialty = inv.deal.specialty || "Other"
        if (!acc[specialty]) {
          acc[specialty] = { invested: 0, currentValue: 0, count: 0 }
        }
        acc[specialty].invested += Number(inv.amount)
        acc[specialty].currentValue += Number(inv.currentValue)
        acc[specialty].count += 1
        return acc
      },
      {} as Record<string, { invested: number; currentValue: number; count: number }>
    )

    return NextResponse.json({
      user,
      role: "INVESTOR",
      metrics: {
        totalInvested,
        currentValue,
        totalDistributions,
        ytdReturn,
        portfolioIRR,
        investmentCount: investments.length,
      },
      investments,
      bySpecialty,
    })
  }

  return NextResponse.json({ user, role: user.role })
}
