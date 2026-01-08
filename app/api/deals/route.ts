import { createClient } from "@/lib/supabase/server"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data: { user: supabaseUser } } = await supabase.auth.getUser()

  if (!supabaseUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const deals = await db.deal.findMany({
    where: {
      status: { in: ["OPEN", "FULLY_FUNDED"] },
    },
    include: {
      investments: {
        select: {
          id: true,
          amount: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  // Calculate current amount from investments
  const dealsWithTotals = deals.map((deal) => {
    const totalInvested = deal.investments.reduce(
      (sum, inv) => sum + Number(inv.amount),
      0
    )
    return {
      ...deal,
      currentAmount: totalInvested,
      investorCount: deal.investments.length,
    }
  })

  return NextResponse.json(dealsWithTotals)
}

// Admin route to create deals
export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user: supabaseUser } } = await supabase.auth.getUser()

  if (!supabaseUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { supabaseId: supabaseUser.id },
  })

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await request.json()
  const {
    name,
    description,
    specialty,
    dealType,
    targetAmount,
    minimumInvestment,
    targetIRR,
    targetMOIC,
    termMonths,
    distributionFrequency,
  } = body

  const deal = await db.deal.create({
    data: {
      name,
      description,
      specialty,
      dealType,
      targetAmount: parseFloat(targetAmount),
      minimumInvestment: parseFloat(minimumInvestment),
      targetIRR: targetIRR ? parseFloat(targetIRR) : null,
      targetMOIC: targetMOIC ? parseFloat(targetMOIC) : null,
      termMonths,
      distributionFrequency,
      status: "OPEN",
      openedAt: new Date(),
    },
  })

  return NextResponse.json(deal)
}
