import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Application from '@/models/Application'
import jwt from 'jsonwebtoken'
import { sendApplicationSubmittedEmail, sendAdminNotificationEmail } from '@/lib/email'

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

// GET - Fetch user's applications
export async function GET(request: Request) {
  try {
    // Verify token
    const decoded = verifyToken(request)
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing token' },
        { status: 401 }
      )
    }

    await dbConnect()

    let applications

    // If admin, get all applications
    if (decoded.role === 'admin') {
      applications = await Application.find()
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
    } else {
      // Regular user gets only their applications
      applications = await Application.find({ userId: decoded.userId })
        .sort({ createdAt: -1 })
    }

    return NextResponse.json({ 
      success: true,
      applications 
    })
  } catch (error: any) {
    console.error('GET applications error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

// POST - Create new application
export async function POST(request: Request) {
  try {
    // Verify token
    const decoded = verifyToken(request)
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login to submit an application' },
        { status: 401 }
      )
    }

    await dbConnect()

    const data = await request.json()

    // Validate required fields
    const requiredFields = ['companyName', 'founderName', 'email', 'industry', 'stage', 'description']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Create application
    const application = await Application.create({
      userId: decoded.userId,
      companyName: data.companyName,
      founderName: data.founderName,
      email: data.email,
      phone: data.phone || '',
      industry: data.industry,
      stage: data.stage,
      fundingAmount: data.fundingAmount || 'Not specified',
      description: data.description,
      status: 'pending',
    })


    // 📧 Send confirmation email to founder (async)
    sendApplicationSubmittedEmail(
    application.founderName,
    application.email,
    application.companyName,
    application.fundingAmount
    ).catch(console.error)

    // 📧 Notify admin of new application (async)
    sendAdminNotificationEmail({
    companyName: application.companyName,
    founderName: application.founderName,
    email: application.email,
    industry: application.industry,
    stage: application.stage,
    fundingAmount: application.fundingAmount,
    }).catch(console.error)

    return NextResponse.json({ success: true, application })

   
  } catch (error: any) {
    console.error('POST application error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    )
  }
}