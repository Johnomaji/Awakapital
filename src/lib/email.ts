import { Resend } from 'resend'
import { WelcomeEmail } from '@/emails/welcome-email'
import { ApplicationSubmittedEmail } from '@/emails/application-submitted-email'
import { ApplicationApprovedEmail } from '@/emails/application-approved-email'
import { ApplicationRejectedEmail } from '@/emails/application-rejected-email'
import { AdminNotificationEmail } from '@/emails/admin-notification-email'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@venturesplatform.com'
const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export async function sendWelcomeEmail(userName: string, userEmail: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: userEmail,
      subject: 'Welcome to Ventures Platform! 🎉',
      react: WelcomeEmail({
        userName,
        loginUrl: `${BASE_URL}/login`,
      }),
    })
    console.log('✅ Welcome email sent to:', userEmail)
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error)
  }
}

export async function sendApplicationSubmittedEmail(
  founderName: string,
  founderEmail: string,
  companyName: string,
  fundingAmount: string
) {
  try {
    await resend.emails.send({
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
    console.log('✅ Application submitted email sent to:', founderEmail)
  } catch (error) {
    console.error('❌ Failed to send application submitted email:', error)
  }
}

export async function sendApplicationApprovedEmail(
  founderName: string,
  founderEmail: string,
  companyName: string
) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: founderEmail,
      subject: `🎉 Great news about your ${companyName} application!`,
      react: ApplicationApprovedEmail({
        founderName,
        companyName,
        dashboardUrl: `${BASE_URL}/dashboard`,
      }),
    })
    console.log('✅ Application approved email sent to:', founderEmail)
  } catch (error) {
    console.error('❌ Failed to send approval email:', error)
  }
}

export async function sendApplicationRejectedEmail(
  founderName: string,
  founderEmail: string,
  companyName: string
) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: founderEmail,
      subject: `Update on your ${companyName} application`,
      react: ApplicationRejectedEmail({
        founderName,
        companyName,
        dashboardUrl: `${BASE_URL}/dashboard`,
      }),
    })
    console.log('✅ Application rejected email sent to:', founderEmail)
  } catch (error) {
    console.error('❌ Failed to send rejection email:', error)
  }
}

export async function sendAdminNotificationEmail(applicationData: {
  companyName: string
  founderName: string
  email: string
  industry: string
  stage: string
  fundingAmount: string
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🚨 New Application: ${applicationData.companyName}`,
      react: AdminNotificationEmail({
        ...applicationData,
        dashboardUrl: `${BASE_URL}/dashboard/admin`,
      }),
    })
    console.log('✅ Admin notification sent')
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error)
  }
}