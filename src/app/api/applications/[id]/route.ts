import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Application from '@/models/Application'
import jwt from 'jsonwebtoken'
import { sendApplicationApprovedEmail, sendApplicationRejectedEmail } from '@/lib/email'

// Helper function to verify token
function verifyToken(request: Request) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    return decoded
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

// PATCH - Update application status (admin only)
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }  // ← Changed: params is now a Promise
) {
  try {
    // Await params (Next.js 15+ requirement)
    const params = await context.params
    
    // Verify token
    const decoded = verifyToken(request)
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    await dbConnect()

    const { status, notes } = await request.json()

    // Validate status
    const validStatuses = ['pending', 'in-review', 'approved', 'rejected']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Update application
    const application = await Application.findByIdAndUpdate(
      params.id,
      {
        status,
        notes,
        reviewedBy: decoded.userId,
        reviewedAt: new Date(),
      },
      { new: true }
    )
    .populate('userId', 'name email')

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    // 📧 Send status update email
    if (status === 'approved') {
    const user = application.userId as any
    sendApplicationApprovedEmail(
        user.name,
        user.email,
        application.companyName
    ).catch(console.error)
    } else if (status === 'rejected') {
    const user = application.userId as any
    sendApplicationRejectedEmail(
        user.name,
        user.email,
        application.companyName
    ).catch(console.error)
    }

    return NextResponse.json({ success: true, application })

  } catch (error: any) {
    console.error('PATCH application error:', error)
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    )
  }
}

// GET - Get single application
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }  // ← Changed: params is now a Promise
) {
  try {
    // Await params (Next.js 15+ requirement)
    const params = await context.params
    
    const decoded = verifyToken(request)
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()

    const application = await Application.findById(params.id)
      .populate('userId', 'name email')

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    // Check if user owns this application or is admin
    if (application.userId._id.toString() !== decoded.userId && decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      application
    })
  } catch (error: any) {
    console.error('GET application error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    )
  }
}