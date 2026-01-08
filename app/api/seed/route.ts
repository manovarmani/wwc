import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST() {
  try {
    const connectionString = process.env.DATABASE_URL

    if (!connectionString) {
      return NextResponse.json(
        { error: "DATABASE_URL not configured" },
        { status: 500 }
      )
    }

    console.log("Seed: Using direct SQL with neon()...")

    // Use neon HTTP driver directly (no Prisma) to avoid the Pool issue
    const sql = neon(connectionString)

    // Create demo deals using raw SQL
    const dealData = [
      {
        id: "deal-ortho-1",
        name: "Orthopedic Surgery Fund I",
        description: "Diversified fund focused on orthopedic surgeons in growth phase. Target 15+ physicians across major metro areas.",
        specialty: "Orthopedics",
        dealType: "fund",
        targetAmount: 2000000,
        minimumInvestment: 50000,
        currentAmount: 875000,
        targetIRR: 12.5,
        targetMOIC: 1.8,
        termMonths: 84,
        distributionFrequency: "quarterly",
        status: "OPEN",
        openedAt: "2024-06-01",
      },
      {
        id: "deal-cardio-1",
        name: "Cardiology Growth Fund",
        description: "Investment in cardiologists establishing private practices. Strong demand in underserved markets.",
        specialty: "Cardiology",
        dealType: "fund",
        targetAmount: 1500000,
        minimumInvestment: 25000,
        currentAmount: 450000,
        targetIRR: 14.2,
        targetMOIC: 2.0,
        termMonths: 60,
        distributionFrequency: "quarterly",
        status: "OPEN",
        openedAt: "2024-08-15",
      },
      {
        id: "deal-multi-1",
        name: "Multi-Specialty Emerging Physicians",
        description: "Balanced portfolio across multiple specialties. Lower risk profile with steady returns.",
        specialty: null,
        dealType: "multi_specialty",
        targetAmount: 3000000,
        minimumInvestment: 100000,
        currentAmount: 1200000,
        targetIRR: 11.0,
        targetMOIC: 1.6,
        termMonths: 96,
        distributionFrequency: "monthly",
        status: "OPEN",
        openedAt: "2024-04-01",
      },
      {
        id: "deal-derm-1",
        name: "Dermatology Practice Fund",
        description: "Focused on dermatologists expanding aesthetic and medical practices.",
        specialty: "Dermatology",
        dealType: "fund",
        targetAmount: 750000,
        minimumInvestment: 25000,
        currentAmount: 225000,
        targetIRR: 13.5,
        targetMOIC: 1.9,
        termMonths: 60,
        distributionFrequency: "quarterly",
        status: "OPEN",
        openedAt: "2024-10-01",
      },
      {
        id: "deal-surgery-1",
        name: "General Surgery Associates",
        description: "Supporting general surgeons in practice acquisitions and equipment upgrades.",
        specialty: "Surgery",
        dealType: "fund",
        targetAmount: 1000000,
        minimumInvestment: 50000,
        currentAmount: 600000,
        targetIRR: 12.0,
        targetMOIC: 1.75,
        termMonths: 72,
        distributionFrequency: "quarterly",
        status: "OPEN",
        openedAt: "2024-07-01",
      },
    ]

    const createdDeals = []

    for (const deal of dealData) {
      // Use ON CONFLICT to upsert
      const result = await sql`
        INSERT INTO "Deal" (
          id, name, description, specialty, "dealType",
          "targetAmount", "minimumInvestment", "currentAmount",
          "targetIRR", "targetMOIC", "termMonths", "distributionFrequency",
          status, "openedAt", "createdAt", "updatedAt"
        ) VALUES (
          ${deal.id}, ${deal.name}, ${deal.description}, ${deal.specialty}, ${deal.dealType},
          ${deal.targetAmount}, ${deal.minimumInvestment}, ${deal.currentAmount},
          ${deal.targetIRR}, ${deal.targetMOIC}, ${deal.termMonths}, ${deal.distributionFrequency},
          ${deal.status}::"DealStatus", ${deal.openedAt}::timestamp, NOW(), NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          "updatedAt" = NOW()
        RETURNING id, name
      `
      createdDeals.push(result[0])
      console.log("Created deal:", result[0]?.name)
    }

    return NextResponse.json({
      success: true,
      message: `Created ${createdDeals.length} demo deals`,
      deals: createdDeals
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    )
  }
}
