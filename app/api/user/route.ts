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

  return NextResponse.json(user)
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const { data: { user: supabaseUser } } = await supabase.auth.getUser()

  if (!supabaseUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { name, phone, avatarUrl, physicianProfile, investorProfile } = body

  const user = await db.user.update({
    where: { supabaseId: supabaseUser.id },
    data: {
      name,
      phone,
      avatarUrl,
      ...(physicianProfile && {
        physicianProfile: {
          update: physicianProfile,
        },
      }),
      ...(investorProfile && {
        investorProfile: {
          update: investorProfile,
        },
      }),
    },
    include: {
      physicianProfile: true,
      investorProfile: true,
    },
  })

  return NextResponse.json(user)
}
