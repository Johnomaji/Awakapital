import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Newsletter from '@/models/Newsletter'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    await dbConnect()

    const existing = await Newsletter.findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json({ success: true, alreadySubscribed: true })
    }

    await Newsletter.create({ email })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
