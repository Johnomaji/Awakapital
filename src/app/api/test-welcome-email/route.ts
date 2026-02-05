import { NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  
  if (!email) {
    return NextResponse.json({
      error: 'Please provide ?email=your@email.com'
    }, { status: 400 })
  }
  
  try {
    console.log('🧪 Test: Sending welcome email to:', email)
    await sendWelcomeEmail('Test User', email)
    
    return NextResponse.json({
      success: true,
      message: `Welcome email sent to ${email}!`,
      checkInbox: 'Check your inbox (and spam folder)',
    })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({
      error: error.message
    }, { status: 500 })
  }
}

