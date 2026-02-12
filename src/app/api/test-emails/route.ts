import { NextResponse } from 'next/server'
import {
  sendWelcomeEmail,
  sendApplicationSubmittedEmail,
  sendApplicationApprovedEmail,
  sendApplicationRejectedEmail,
  sendAdminNotificationEmail,
} from '@/lib/email'

const EMAIL_TYPES = ['welcome', 'submitted', 'approved', 'rejected', 'admin-notification'] as const
type EmailType = typeof EMAIL_TYPES[number]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const type = searchParams.get('type') as EmailType | null

  if (!email || !type) {
    return NextResponse.json({
      error: 'Missing required params',
      usage: '/api/test-emails?email=you@example.com&type=welcome',
      availableTypes: EMAIL_TYPES,
    }, { status: 400 })
  }

  if (!EMAIL_TYPES.includes(type)) {
    return NextResponse.json({
      error: `Invalid type "${type}"`,
      availableTypes: EMAIL_TYPES,
    }, { status: 400 })
  }

  try {
    const testName = 'Test User'
    const testCompany = 'Test Company Inc.'
    const testFunding = '$500,000'

    switch (type) {
      case 'welcome':
        await sendWelcomeEmail(testName, email)
        break
      case 'submitted':
        await sendApplicationSubmittedEmail(testName, email, testCompany, testFunding)
        break
      case 'approved':
        await sendApplicationApprovedEmail(testName, email, testCompany)
        break
      case 'rejected':
        await sendApplicationRejectedEmail(testName, email, testCompany)
        break
      case 'admin-notification':
        await sendAdminNotificationEmail({
          companyName: testCompany,
          founderName: testName,
          email: email,
          industry: 'Fintech',
          stage: 'Series A',
          fundingAmount: testFunding,
        })
        break
    }

    return NextResponse.json({
      success: true,
      type,
      message: `"${type}" email sent to ${email}`,
      checkInbox: 'Check your inbox (and spam folder)',
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error(`Failed to send ${type} email:`, error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
