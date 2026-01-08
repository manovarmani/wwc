import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@app.whitecoatcapital.org"

export async function sendVerificationEmail(email: string, token: string, redirectTo: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/verify?token=${token}&type=signup&redirect_to=${encodeURIComponent(redirectTo)}`

  const { data, error } = await resend.emails.send({
    from: `White Coat Capital <${FROM_EMAIL}>`,
    to: email,
    subject: "Verify your email - White Coat Capital",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #166534; margin: 0; font-size: 28px;">White Coat Capital</h1>
              </div>

              <h2 style="color: #1a1a1a; font-size: 24px; margin: 0 0 16px;">Verify your email</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Thanks for signing up! Please click the button below to verify your email address and get started.
              </p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${verifyUrl}" style="display: inline-block; background: #166534; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Verify Email
                </a>
              </div>

              <p style="color: #999; font-size: 14px; margin: 24px 0 0;">
                If you didn't create an account, you can safely ignore this email.
              </p>

              <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

              <p style="color: #999; font-size: 12px; margin: 0; text-align: center;">
                White Coat Capital - Investing in Healthcare Professionals
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  })

  if (error) {
    console.error("Failed to send verification email:", error)
    throw error
  }

  return data
}

export async function sendPasswordResetEmail(email: string, token: string, redirectTo: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/verify?token=${token}&type=recovery&redirect_to=${encodeURIComponent(redirectTo)}`

  const { data, error } = await resend.emails.send({
    from: `White Coat Capital <${FROM_EMAIL}>`,
    to: email,
    subject: "Reset your password - White Coat Capital",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #166534; margin: 0; font-size: 28px;">White Coat Capital</h1>
              </div>

              <h2 style="color: #1a1a1a; font-size: 24px; margin: 0 0 16px;">Reset your password</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                We received a request to reset your password. Click the button below to choose a new one.
              </p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: #166534; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Reset Password
                </a>
              </div>

              <p style="color: #999; font-size: 14px; margin: 24px 0 0;">
                If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
              </p>

              <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

              <p style="color: #999; font-size: 12px; margin: 0; text-align: center;">
                White Coat Capital - Investing in Healthcare Professionals
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  })

  if (error) {
    console.error("Failed to send password reset email:", error)
    throw error
  }

  return data
}

export async function sendWelcomeEmail(email: string, name: string, role: "physician" | "investor") {
  const dashboardUrl = role === "physician"
    ? "https://app.whitecoatcapital.org/physician"
    : "https://app.whitecoatcapital.org/investor"

  const { data, error } = await resend.emails.send({
    from: `White Coat Capital <${FROM_EMAIL}>`,
    to: email,
    subject: "Welcome to White Coat Capital!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #166534; margin: 0; font-size: 28px;">White Coat Capital</h1>
              </div>

              <h2 style="color: #1a1a1a; font-size: 24px; margin: 0 0 16px;">Welcome${name ? `, ${name}` : ""}!</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                ${role === "physician"
                  ? "Your account has been created. You're now ready to explore funding options tailored for healthcare professionals like you."
                  : "Your investor account is ready. Start exploring investment opportunities in the healthcare sector."}
              </p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${dashboardUrl}" style="display: inline-block; background: #166534; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Go to Dashboard
                </a>
              </div>

              <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

              <p style="color: #999; font-size: 12px; margin: 0; text-align: center;">
                White Coat Capital - Investing in Healthcare Professionals
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  })

  if (error) {
    console.error("Failed to send welcome email:", error)
    throw error
  }

  return data
}

export async function sendApplicationSubmittedEmail(email: string, name: string, applicationId: string) {
  const { data, error } = await resend.emails.send({
    from: `White Coat Capital <${FROM_EMAIL}>`,
    to: email,
    subject: "Application Received - White Coat Capital",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #166534; margin: 0; font-size: 28px;">White Coat Capital</h1>
              </div>

              <h2 style="color: #1a1a1a; font-size: 24px; margin: 0 0 16px;">Application Received</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Hi${name ? ` ${name}` : ""},<br><br>
                We've received your funding application! Our team will review your information and get back to you with personalized funding proposals.
              </p>

              <div style="background: #f0fdf4; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <p style="color: #166534; font-size: 14px; margin: 0;">
                  <strong>Application ID:</strong> ${applicationId}<br>
                  <strong>Status:</strong> Under Review
                </p>
              </div>

              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                We typically respond within 1-2 business days. In the meantime, feel free to explore your dashboard.
              </p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="https://app.whitecoatcapital.org/physician" style="display: inline-block; background: #166534; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  View Dashboard
                </a>
              </div>

              <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

              <p style="color: #999; font-size: 12px; margin: 0; text-align: center;">
                White Coat Capital - Investing in Healthcare Professionals
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  })

  if (error) {
    console.error("Failed to send application email:", error)
    throw error
  }

  return data
}

export async function sendInvestmentConfirmationEmail(
  email: string,
  name: string,
  dealName: string,
  amount: number
) {
  const { data, error } = await resend.emails.send({
    from: `White Coat Capital <${FROM_EMAIL}>`,
    to: email,
    subject: "Investment Confirmed - White Coat Capital",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #166534; margin: 0; font-size: 28px;">White Coat Capital</h1>
              </div>

              <h2 style="color: #1a1a1a; font-size: 24px; margin: 0 0 16px;">Investment Confirmed</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Hi${name ? ` ${name}` : ""},<br><br>
                Your investment has been confirmed. Here are the details:
              </p>

              <div style="background: #f0fdf4; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <p style="color: #166534; font-size: 14px; margin: 0;">
                  <strong>Deal:</strong> ${dealName}<br>
                  <strong>Amount:</strong> $${amount.toLocaleString()}<br>
                  <strong>Date:</strong> ${new Date().toLocaleDateString()}
                </p>
              </div>

              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                You can view your portfolio and track performance in your investor dashboard.
              </p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="https://app.whitecoatcapital.org/investor" style="display: inline-block; background: #166534; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  View Portfolio
                </a>
              </div>

              <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

              <p style="color: #999; font-size: 12px; margin: 0; text-align: center;">
                White Coat Capital - Investing in Healthcare Professionals
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  })

  if (error) {
    console.error("Failed to send investment confirmation email:", error)
    throw error
  }

  return data
}
