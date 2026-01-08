import { config } from "dotenv"
import { resolve } from "path"

// Load environment variables first
const result = config({ path: resolve(process.cwd(), ".env.local") })
if (result.error) {
  console.error("Error loading .env.local:", result.error)
}

// Now import the rest after env is loaded
async function main() {
  const { PrismaClient } = await import("@prisma/client")
  const { PrismaNeon } = await import("@prisma/adapter-neon")
  const { neon } = await import("@neondatabase/serverless")

  const dbUrl = process.env.DATABASE_URL!
  console.log("DATABASE_URL:", dbUrl.substring(0, 30) + "...")

  const sql = neon(dbUrl)
  const adapter = new PrismaNeon(sql)
  const prisma = new PrismaClient({ adapter })

  console.log("Seeding database...")

  // Create demo deals for investors
  const deals = await Promise.all([
    prisma.deal.upsert({
      where: { id: "deal-ortho-1" },
      update: {},
      create: {
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
        openedAt: new Date("2024-06-01"),
      },
    }),
    prisma.deal.upsert({
      where: { id: "deal-cardio-1" },
      update: {},
      create: {
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
        openedAt: new Date("2024-08-15"),
      },
    }),
    prisma.deal.upsert({
      where: { id: "deal-multi-1" },
      update: {},
      create: {
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
        openedAt: new Date("2024-04-01"),
      },
    }),
    prisma.deal.upsert({
      where: { id: "deal-derm-1" },
      update: {},
      create: {
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
        openedAt: new Date("2024-10-01"),
      },
    }),
    prisma.deal.upsert({
      where: { id: "deal-surgery-1" },
      update: {},
      create: {
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
        openedAt: new Date("2024-07-01"),
      },
    }),
  ])

  console.log(`Created ${deals.length} demo deals`)
  console.log("Seeding complete!")

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
