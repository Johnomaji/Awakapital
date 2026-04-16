import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await sendContactEmail({ name, email, company: company || '', message })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
