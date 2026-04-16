import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
    }

    if (decoded.purpose !== 'password-reset') {
      return NextResponse.json({ error: 'Invalid reset token' }, { status: 400 })
    }

    await dbConnect()

    const hashed = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate(decoded.userId, { password: hashed })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 })
  }
}
