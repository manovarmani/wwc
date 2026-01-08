import { createClient } from "@/lib/supabase/server"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import type { UserRole } from "@prisma/client"

// Handle direct signup (when email confirmation is disabled)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { supabaseId, email, name, role } = body

    // Check if user already exists
    let user = await db.user.findUnique({
      where: { supabaseId },
    })

    if (!user) {
      user = await db.user.create({
        data: {
          supabaseId,
          email,
          name,
          role: (role as UserRole) || "PHYSICIAN",
        },
      })

      // Create profile based on role
      if (user.role === "PHYSICIAN") {
        await db.physicianProfile.create({
          data: { userId: user.id },
        })
      } else if (user.role === "INVESTOR") {
        await db.investorProfile.create({
          data: { userId: user.id },
        })
      }
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

// Handle OAuth callback
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard"
  const role = searchParams.get("role") as UserRole | null

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if user exists in our database
      let user = await db.user.findUnique({
        where: { supabaseId: data.user.id },
      })

      // If not, create the user
      if (!user) {
        user = await db.user.create({
          data: {
            supabaseId: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.full_name || data.user.user_metadata?.name,
            role: role || "PHYSICIAN",
          },
        })

        // Create profile based on role
        if (user.role === "PHYSICIAN") {
          await db.physicianProfile.create({
            data: { userId: user.id },
          })
        } else if (user.role === "INVESTOR") {
          await db.investorProfile.create({
            data: { userId: user.id },
          })
        }
      }

      // Redirect based on role
      const redirectPath = user.role === "INVESTOR" ? "/investor" : "/physician"
      return NextResponse.redirect(`${origin}${next === "/dashboard" ? redirectPath : next}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth?error=Could not authenticate user`)
}
