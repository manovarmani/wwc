import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { neon } from "@neondatabase/serverless"

declare global {
  var prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set")
  }

  // Use neon HTTP driver (works reliably in serverless environments)
  const sql = neon(connectionString)
  const adapter = new PrismaNeon(sql)
  return new PrismaClient({ adapter })
}

export const db = globalThis.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db
}
