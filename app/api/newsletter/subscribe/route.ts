import { NextRequest, NextResponse } from 'next/server'

// 简单的邮箱验证
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Newsletter订阅API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source = 'unknown', constitutionType, name } = body

    // 验证邮箱
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // 记录订阅信息（目前保存到内存/日志，后续可集成Mailchimp/SendGrid）
    const subscriptionData = {
      email,
      source,
      constitutionType,
      name,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    }

    console.log('📧 Newsletter Subscription:', subscriptionData)

    // TODO: 集成邮件服务提供商
    // 选项1: Mailchimp API
    // 选项2: SendGrid API
    // 选项3: ConvertKit API
    // 选项4: 保存到数据库（Supabase/Firebase）

    // 模拟发送欢迎邮件
    const welcomeEmailSent = await sendWelcomeEmail(email, constitutionType)

    if (welcomeEmailSent) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed! Check your email for your personalized guide.',
        data: {
          email,
          subscriptionId: `sub_${Date.now()}` // 临时ID
        }
      })
    } else {
      return NextResponse.json({
        success: true,
        message: 'Subscription recorded. Email will be sent shortly.',
        data: { email }
      })
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process subscription',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// 模拟发送欢迎邮件（未来替换为真实邮件服务）
async function sendWelcomeEmail(email: string, constitutionType?: string): Promise<boolean> {
  // 未来集成SendGrid/Mailchimp等服务
  // 目前只记录日志
  console.log(`📨 Welcome email would be sent to: ${email}`)
  console.log(`   Constitution Type: ${constitutionType || 'Not specified'}`)
  console.log(`   Content: Personalized herb guide + lifestyle tips`)
  
  // 模拟成功
  return true
}

// 获取订阅者列表（管理员功能）
export async function GET(request: NextRequest) {
  try {
    // TODO: 从数据库获取订阅者列表
    // 目前返回模拟数据
    
    const { searchParams } = new URL(request.url)
    const adminKey = searchParams.get('adminKey')

    // 简单的管理员验证
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 模拟订阅者数据
    const mockSubscribers = [
      {
        email: 'user1@example.com',
        source: 'quick-constitution-test',
        constitutionType: '气虚',
        subscribedAt: new Date().toISOString(),
        status: 'active'
      },
      {
        email: 'user2@example.com',
        source: 'homepage',
        constitutionType: '阴虚',
        subscribedAt: new Date().toISOString(),
        status: 'active'
      }
    ]

    return NextResponse.json({
      success: true,
      data: mockSubscribers,
      total: mockSubscribers.length
    })

  } catch (error) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}
