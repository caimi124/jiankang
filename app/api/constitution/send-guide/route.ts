import { NextRequest, NextResponse } from 'next/server'

interface EmailData {
  email: string
  constitution: string
  constitutionEnglish: string
  recommendedHerbs: string[]
  dietaryRecommendations: any
  lifestyleAdvice: string[]
  timestamp: string
  source: string
}

export async function POST(request: NextRequest) {
  try {
    const emailData: EmailData = await request.json()
    
    // 验证输入数据
    if (!emailData.email || !emailData.constitution) {
      return NextResponse.json(
        { success: false, error: 'Email and constitution are required' },
        { status: 400 }
      )
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailData.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    console.log('📧 Constitution guide request received:', {
      email: emailData.email,
      constitution: emailData.constitution,
      timestamp: emailData.timestamp
    })
    
    // 模拟邮件发送 - 在实际项目中，这里应该集成真实的邮件服务
    // 例如: SendGrid, Mailgun, Amazon SES 等
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 在实际应用中，这里会：
    // 1. 保存用户邮箱到数据库
    // 2. 生成个性化的PDF报告
    // 3. 发送邮件包含报告
    // 4. 可能添加到邮件列表
    
    // 模拟成功响应
    return NextResponse.json({
      success: true,
      message: 'Guide sent successfully',
      data: {
        email: emailData.email,
        constitution: emailData.constitution,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('❌ Send guide API error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send guide',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Constitution Guide API',
      endpoints: {
        POST: '/api/constitution/send-guide - Send personalized constitution guide via email'
      }
    },
    { status: 200 }
  )
}
