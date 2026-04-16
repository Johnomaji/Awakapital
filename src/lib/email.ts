import { Resend } from 'resend'
import { WelcomeEmail } from '@/emails/welcome-email'
import { ApplicationSubmittedEmail } from '@/emails/application-submitted-email'
import { ApplicationApprovedEmail } from '@/emails/application-approved-email'
import { ApplicationRejectedEmail } from '@/emails/application-rejected-email'
import { AdminNotificationEmail } from '@/emails/admin-notification-email'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'founders@awakapital.vc'
const BASE_URL = process.env.NEXTAUTH_URL || 'https://awakapital.vc'

export async function sendWelcomeEmail(userName: string, userEmail: string) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: userEmail,
    subject: 'Welcome to Awakapital! 🎉',
    react: WelcomeEmail({
      userName,
      loginUrl: `${BASE_URL}/login`,
    }),
  })

  if (error) {
    console.error('❌ Failed to send welcome email:', error)
    throw new Error(`Welcome email failed: ${error.message}`)
  }

  console.log('✅ Welcome email sent to:', userEmail, 'id:', data?.id)
}

export async function sendApplicationSubmittedEmail(
  founderName: string,
  founderEmail: string,
  companyName: string,
  fundingAmount: string
) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: founderEmail,
    subject: `Application Received - We'll review within 48 hours`,
    react: ApplicationSubmittedEmail({
      founderName,
      companyName,
      fundingAmount,
      dashboardUrl: `${BASE_URL}/dashboard`,
    }),
  })

  if (error) {
    console.error('❌ Failed to send application submitted email:', error)
    throw new Error(`Application submitted email failed: ${error.message}`)
  }

  console.log('✅ Application submitted email sent to:', founderEmail, 'id:', data?.id)
}

export async function sendApplicationApprovedEmail(
  founderName: string,
  founderEmail: string,
  companyName: string
) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: founderEmail,
    subject: `🎉 Great news about your ${companyName} application!`,
    react: ApplicationApprovedEmail({
      founderName,
      companyName,
      dashboardUrl: `${BASE_URL}/dashboard`,
    }),
  })

  if (error) {
    console.error('❌ Failed to send approval email:', error)
    throw new Error(`Approval email failed: ${error.message}`)
  }

  console.log('✅ Application approved email sent to:', founderEmail, 'id:', data?.id)
}

export async function sendApplicationRejectedEmail(
  founderName: string,
  founderEmail: string,
  companyName: string
) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: founderEmail,
    subject: `Update on your ${companyName} application`,
    react: ApplicationRejectedEmail({
      founderName,
      companyName,
      dashboardUrl: `${BASE_URL}/dashboard`,
    }),
  })

  if (error) {
    console.error('❌ Failed to send rejection email:', error)
    throw new Error(`Rejection email failed: ${error.message}`)
  }

  console.log('✅ Application rejected email sent to:', founderEmail, 'id:', data?.id)
}

export async function sendContactEmail(data: {
  name: string
  email: string
  company: string
  message: string
}) {
  const { data: result, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `📩 New Contact Message from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
      <p><strong>Message:</strong></p>
      <blockquote style="border-left:4px solid #ccc;padding-left:12px;color:#555">${data.message.replace(/\n/g, '<br/>')}</blockquote>
    `,
  })
  if (error) throw new Error(`Contact email failed: ${error.message}`)
  console.log('✅ Contact email sent, id:', result?.id)
}

export async function sendPasswordResetEmail(userName: string, userEmail: string, resetUrl: string) {
  const { data: result, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: userEmail,
    subject: 'Reset your Awakapital password',
    html: `
      <h2>Password Reset Request</h2>
      <p>Hi ${userName},</p>
      <p>We received a request to reset your password. Click the link below to set a new password. This link expires in <strong>1 hour</strong>.</p>
      <p><a href="${resetUrl}" style="background:#7c3aed;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin:16px 0">Reset My Password</a></p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  })
  if (error) throw new Error(`Password reset email failed: ${error.message}`)
  console.log('✅ Password reset email sent to:', userEmail, 'id:', result?.id)
}

export async function sendAdminNotificationEmail(applicationData: {
  companyName: string
  founderName: string
  email: string
  industry: string
  stage: string
  fundingAmount: string
}) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `🚨 New Application: ${applicationData.companyName}`,
    react: AdminNotificationEmail({
      ...applicationData,
      dashboardUrl: `${BASE_URL}/dashboard/admin`,
    }),
  })

  if (error) {
    console.error('❌ Failed to send admin notification:', error)
    throw new Error(`Admin notification email failed: ${error.message}`)
  }

  console.log('✅ Admin notification sent, id:', data?.id)
}
