#!/usr/bin/env node

/**
 * Sanity CMS 初始化脚本
 * 自动创建Sanity项目并配置基础数据
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 开始初始化 Sanity CMS...')

// 检查是否已安装 Sanity CLI
function checkSanityCLI() {
  try {
    execSync('sanity --version', { stdio: 'ignore' })
    console.log('✅ Sanity CLI 已安装')
    return true
  } catch (error) {
    console.log('❌ Sanity CLI 未安装，正在安装...')
    try {
      execSync('npm install -g @sanity/cli', { stdio: 'inherit' })
      console.log('✅ Sanity CLI 安装成功')
      return true
    } catch (installError) {
      console.error('❌ Sanity CLI 安装失败:', installError.message)
      return false
    }
  }
}

// 创建环境变量文件
function createEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local')
  
  if (fs.existsSync(envPath)) {
    console.log('✅ .env.local 已存在')
    return
  }

  const envContent = `# Sanity CMS Configuration
# 请访问 https://www.sanity.io/manage 获取这些值
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Notion Configuration (保持现有配置)
NOTION_SECRET=your_notion_secret
NOTION_DATABASE_ID=your_notion_database_id

# Other
NEXT_PUBLIC_SITE_URL=https://www.herbscience.shop
`

  fs.writeFileSync(envPath, envContent)
  console.log('✅ 创建 .env.local 文件')
}

// 创建初始数据
function createInitialData() {
  const dataPath = path.join(__dirname, 'sanity-initial-data.json')
  
  const initialData = {
    authors: [
      {
        _type: 'author',
        name: 'HerbScience Team',
        slug: { _type: 'slug', current: 'herbscience-team' },
        credentials: '专业草药研究团队',
        bio: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'HerbScience 专业团队由草药学专家、营养师和健康顾问组成，致力于为用户提供科学、可靠的草药健康信息。'
              }
            ]
          }
        ],
        expertise: ['草药学', '营养学', '健康咨询']
      }
    ],
    categories: [
      {
        _type: 'category',
        title: 'Health & Wellness',
        slug: { _type: 'slug', current: 'health-wellness' },
        description: '健康与养生相关文章',
        color: 'green',
        icon: 'heart'
      },
      {
        _type: 'category',
        title: 'Research',
        slug: { _type: 'slug', current: 'research' },
        description: '最新研究和科学发现',
        color: 'blue',
        icon: 'brain'
      },
      {
        _type: 'category',
        title: 'Lifestyle',
        slug: { _type: 'slug', current: 'lifestyle' },
        description: '生活方式和实用指南',
        color: 'purple',
        icon: 'leaf'
      }
    ]
  }

  fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2))
  console.log('✅ 创建初始数据文件')
  
  return dataPath
}

// 主函数
async function main() {
  try {
    // 1. 检查 Sanity CLI
    if (!checkSanityCLI()) {
      process.exit(1)
    }

    // 2. 创建环境变量文件
    createEnvFile()

    // 3. 创建初始数据
    const dataPath = createInitialData()

    console.log('\n🎉 Sanity CMS 初始化完成！')
    console.log('\n📝 接下来的步骤：')
    console.log('1. 运行: sanity login')
    console.log('2. 运行: sanity init')
    console.log('3. 按提示创建新项目或选择现有项目')
    console.log('4. 复制项目ID到 .env.local 文件中')
    console.log('5. 访问 https://www.sanity.io/manage 创建API token')
    console.log('6. 运行: npm run dev')
    console.log('7. 访问: http://localhost:3000/admin')
    console.log('\n🚀 开始使用您的混合CMS系统！')

  } catch (error) {
    console.error('❌ 初始化失败:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
} 