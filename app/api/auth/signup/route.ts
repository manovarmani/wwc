import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/email"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, role } = body

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      )
    }

    // Check if user already exists in our database
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      )
    }

    // Check if there's a pending verification token for this email
    const existingToken = await db.verificationToken.findFirst({
      where: { email },
    })

    if (existingToken) {
      // Delete old token
      await db.verificationToken.delete({
        where: { id: existingToken.id },
      })
    }

    // Generate a secure verification token
    const token = crypto.randomBytes(32).toString("hex")

    // Create verification token with 24 hour expiry
    await db.verificationToken.create({
      data: {
        email,
        token,
        name,
        role: role || "PHYSICIAN",
        password, // Store temporarily - will be used when creating Supabase user
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    })

    // Send verification email via Resend
    await sendVerificationEmail({
      email,
      name,
      token,
    })

    return NextResponse.json({
      success: true,
      message: "Verification email sent. Please check your inbox.",
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    )
  }
}
