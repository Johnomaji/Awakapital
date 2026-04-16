import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    await dbConnect()

    const user = await User.findOne({ email: email.toLowerCase() })

    // Always return success to avoid leaking whether email exists
    if (!user) {
      return NextResponse.json({ success: true })
    }

    const resetToken = jwt.sign(
      { userId: user._id.toString(), purpose: 'password-reset' },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    )

    const BASE_URL = process.env.NEXTAUTH_URL || 'https://awakapital.vc'
    const resetUrl = `${BASE_URL}/reset-password?token=${resetToken}`

    await sendPasswordResetEmail(user.name, user.email, resetUrl)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
