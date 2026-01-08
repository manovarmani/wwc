import { db } from "@/lib/db"
import { createClient } from "@/lib/supabase/server"
import type { User } from "@prisma/client"

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()
  const { data: { user: supabaseUser } } = await supabase.auth.getUser()

  if (!supabaseUser) return null

  const user = await db.user.findUnique({
    where: { supabaseId: supabaseUser.id },
  })

  return user
}

export async function getCurrentUserWithProfile() {
  const supabase = await createClient()
  const { data: { user: supabaseUser } } = await supabase.auth.getUser()

  if (!supabaseUser) return null

  const user = await db.user.findUnique({
    where: { supabaseId: supabaseUser.id },
    include: {
      physicianProfile: true,
      investorProfile: true,
    },
  })

  return user
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }
  return user
}
