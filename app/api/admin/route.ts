import { createClient } from "@/lib/supabase/server"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user: supabaseUser } } = await supabase.auth.getUser()

  if (!supabaseUser) {
    return null
  }

  const user = await db.user.findUnique({
    where: { supabaseId: supabaseUser.id },
  })

  if (!user || user.role !== "ADMIN") {
    return null
  }

  return user
}

export async function GET() {
  const admin = await requireAdmin()
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // Get admin dashboard stats
  const [
    userCount,
    physicianCount,
    investorCount,
    applicationCount,
    dealCount,
    investmentCount,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { role: "PHYSICIAN" } }),
    db.user.count({ where: { role: "INVESTOR" } }),
    db.fundingApplication.count(),
    db.deal.count(),
    db.investment.count(),
  ])

  // Get recent activity
  const recentApplications = await db.fundingApplication.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  })

  const recentInvestments = await db.investment.findMany({
    take: 10,
    orderBy: { investedAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      deal: { select: { name: true } },
    },
  })

  return NextResponse.json({
    stats: {
      userCount,
      physicianCount,
      investorCount,
      applicationCount,
      dealCount,
      investmentCount,
    },
    recentApplications,
    recentInvestments,
  })
}
