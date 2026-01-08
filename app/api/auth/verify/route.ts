import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { db } from "@/lib/db"
import { sendWelcomeEmail } from "@/lib/email"
import type { UserRole } from "@prisma/client"

// Create Supabase admin client with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")
  const origin = new URL(request.url).origin

  if (!token) {
    return NextResponse.redirect(`${origin}/auth?error=Missing verification token`)
  }

  try {
    // Find the verification token
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    })

    if (!verificationToken) {
      return NextResponse.redirect(`${origin}/auth?error=Invalid or expired verification link`)
    }

    // Check if token has expired
    if (new Date() > verificationToken.expires) {
      // Delete expired token
      await db.verificationToken.delete({
        where: { id: verificationToken.id },
      })
      return NextResponse.redirect(`${origin}/auth?error=Verification link has expired. Please sign up again.`)
    }

    // Check if user already exists (in case they verified twice)
    const existingUser = await db.user.findUnique({
      where: { email: verificationToken.email },
    })

    if (existingUser) {
      // Delete the token since user already exists
      await db.verificationToken.delete({
        where: { id: verificationToken.id },
      })
      return NextResponse.redirect(`${origin}/auth?message=Email already verified. Please sign in.`)
    }

    // Create the user in Supabase using admin API (auto-confirms email)
    let supabaseUserId: string

    const { data: supabaseUser, error: supabaseError } = await supabaseAdmin.auth.admin.createUser({
      email: verificationToken.email,
      password: verificationToken.password,
      email_confirm: true, // Mark email as confirmed
      user_metadata: {
        full_name: verificationToken.name,
        role: verificationToken.role,
      },
    })

    if (supabaseError) {
      // If user already exists in Supabase, try to fetch their ID
      if (supabaseError.message.includes("already been registered")) {
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
        const existingSupabaseUser = existingUsers?.users.find(u => u.email === verificationToken.email)

        if (existingSupabaseUser) {
          supabaseUserId = existingSupabaseUser.id
        } else {
          console.error("Supabase user creation error:", supabaseError.message, supabaseError)
          return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent(supabaseError.message || "Failed to create account. Please try again.")}`)
        }
      } else {
        console.error("Supabase user creation error:", supabaseError.message, supabaseError)
        return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent(supabaseError.message || "Failed to create account. Please try again.")}`)
      }
    } else {
      supabaseUserId = supabaseUser.user.id
    }

    // Create user in our database
    const user = await db.user.create({
      data: {
        supabaseId: supabaseUserId,
        email: verificationToken.email,
        name: verificationToken.name,
        role: verificationToken.role as UserRole,
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

    // Delete the verification token
    await db.verificationToken.delete({
      where: { id: verificationToken.id },
    })

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.name || "", user.role).catch(console.error)

    // Redirect to login with success message
    const redirectPath = user.role === "INVESTOR" ? "/investor" : "/physician"
    return NextResponse.redirect(`${origin}/auth?verified=true&redirect=${redirectPath}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Verification error:", errorMessage, error)
    return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent("Verification failed: " + errorMessage)}`)
  }
}
