import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

function verifyToken(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return null
  try {
    return jwt.verify(authHeader.replace('Bearer ', ''), process.env.JWT_SECRET!) as any
  } catch {
    return null
  }
}

// PATCH - Update profile (name, company, phone) or change password
export async function PATCH(request: Request) {
  try {
    const decoded = verifyToken(request)
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()

    const body = await request.json()
    const { name, company, phone, currentPassword, newPassword } = body

    const user = await User.findById(decoded.userId)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // Password change
    if (currentPassword && newPassword) {
      const valid = await bcrypt.compare(currentPassword, user.password)
      if (!valid) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
      if (newPassword.length < 6) return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 })
      user.password = await bcrypt.hash(newPassword, 10)
    }

    if (name) user.name = name
    if (company !== undefined) user.company = company
    if (phone !== undefined) user.phone = phone

    await user.save()

    return NextResponse.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, company: user.company, phone: user.phone },
    })
  } catch (error: any) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
