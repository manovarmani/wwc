import { createClient } from "@/lib/supabase/server"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
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

  const application = await db.fundingApplication.findFirst({
    where: { id, userId: user.id },
    include: { proposals: true },
  })

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 })
  }

  return NextResponse.json(application)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
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

  const body = await request.json()
  const { selectedProposalId } = body

  // Verify the application belongs to the user
  const existingApp = await db.fundingApplication.findFirst({
    where: { id, userId: user.id },
  })

  if (!existingApp) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 })
  }

  // Update application with selected proposal
  const application = await db.fundingApplication.update({
    where: { id },
    data: {
      selectedProposalId,
      status: "APPROVED",
    },
    include: { proposals: true },
  })

  // Update the proposal status
  if (selectedProposalId) {
    await db.proposal.update({
      where: { id: selectedProposalId },
      data: { status: "ACCEPTED" },
    })

    // Mark other proposals as rejected
    await db.proposal.updateMany({
      where: {
        applicationId: id,
        id: { not: selectedProposalId },
      },
      data: { status: "REJECTED" },
    })
  }

  return NextResponse.json(application)
}
