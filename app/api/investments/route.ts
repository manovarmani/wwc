import { createClient } from "@/lib/supabase/server"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { sendInvestmentConfirmationEmail } from "@/lib/email"

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

  const investments = await db.investment.findMany({
    where: { userId: user.id },
    include: {
      deal: true,
      distributions: {
        orderBy: { paidAt: "desc" },
      },
    },
    orderBy: { investedAt: "desc" },
  })

  // Calculate totals
  const totals = investments.reduce(
    (acc, inv) => ({
      totalInvested: acc.totalInvested + Number(inv.amount),
      currentValue: acc.currentValue + Number(inv.currentValue),
      totalDistributions: acc.totalDistributions + inv.distributions.reduce((sum, d) => sum + Number(d.amount), 0),
    }),
    { totalInvested: 0, currentValue: 0, totalDistributions: 0 }
  )

  return NextResponse.json({
    investments,
    totals,
  })
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

  if (user.role !== "INVESTOR") {
    return NextResponse.json({ error: "Only investors can make investments" }, { status: 403 })
  }

  const body = await request.json()
  const { dealId, amount } = body

  // Verify deal exists and is open
  const deal = await db.deal.findUnique({
    where: { id: dealId },
  })

  if (!deal) {
    return NextResponse.json({ error: "Deal not found" }, { status: 404 })
  }

  if (deal.status !== "OPEN") {
    return NextResponse.json({ error: "Deal is not open for investment" }, { status: 400 })
  }

  if (Number(amount) < Number(deal.minimumInvestment)) {
    return NextResponse.json(
      { error: `Minimum investment is $${deal.minimumInvestment}` },
      { status: 400 }
    )
  }

  // Check if user already has investment in this deal
  const existingInvestment = await db.investment.findUnique({
    where: {
      userId_dealId: {
        userId: user.id,
        dealId,
      },
    },
  })

  if (existingInvestment) {
    // Update existing investment
    const investment = await db.investment.update({
      where: { id: existingInvestment.id },
      data: {
        amount: { increment: parseFloat(amount) },
        currentValue: { increment: parseFloat(amount) },
      },
      include: { deal: true },
    })

    // Send confirmation email
    try {
      await sendInvestmentConfirmationEmail(
        user.email,
        user.name || "",
        deal.name,
        parseFloat(amount)
      )
    } catch (emailError) {
      console.error("Failed to send investment email:", emailError)
    }

    return NextResponse.json(investment)
  }

  // Create new investment
  const investment = await db.investment.create({
    data: {
      userId: user.id,
      dealId,
      amount: parseFloat(amount),
      currentValue: parseFloat(amount),
    },
    include: { deal: true },
  })

  // Update deal current amount
  await db.deal.update({
    where: { id: dealId },
    data: {
      currentAmount: { increment: parseFloat(amount) },
    },
  })

  // Check if deal is fully funded
  const updatedDeal = await db.deal.findUnique({
    where: { id: dealId },
  })

  if (updatedDeal && Number(updatedDeal.currentAmount) >= Number(updatedDeal.targetAmount)) {
    await db.deal.update({
      where: { id: dealId },
      data: { status: "FULLY_FUNDED" },
    })
  }

  // Send confirmation email for new investment
  try {
    await sendInvestmentConfirmationEmail(
      user.email,
      user.name || "",
      deal.name,
      parseFloat(amount)
    )
  } catch (emailError) {
    console.error("Failed to send investment email:", emailError)
  }

  return NextResponse.json(investment)
}
