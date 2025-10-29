/**
 * IndexNow 设置脚本
 * 生成 API Key 并创建验证文件
 * 
 * 使用方法:
 * node scripts/setup-indexnow.js
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

// 生成随机 API Key (32位十六进制字符串)
function generateApiKey() {
  return crypto.randomBytes(16).toString('hex')
}

// 读取或生成 API Key
function getOrCreateApiKey() {
  const envPath = path.join(process.cwd(), '.env.local')
  
  // 检查 .env.local 是否已有 INDEXNOW_API_KEY
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    const match = envContent.match(/INDEXNOW_API_KEY=(.+)/)
    if (match && match[1]) {
      console.log('✅ 发现现有的 IndexNow API Key')
      return match[1].trim()
    }
  }

  // 生成新的 API Key
  const apiKey = generateApiKey()
  console.log('🔑 生成新的 IndexNow API Key:', apiKey)

  // 追加到 .env.local
  const newEnvLine = `\n# IndexNow API Key for search engine instant indexing\nINDEXNOW_API_KEY=${apiKey}\n`
  fs.appendFileSync(envPath, newEnvLine)
  console.log('✅ API Key 已保存到 .env.local')

  return apiKey
}

// 创建 API Key 验证文件
function createKeyFile(apiKey) {
  const publicDir = path.join(process.cwd(), 'public')
  const keyFilePath = path.join(publicDir, `${apiKey}.txt`)

  // 确保 public 目录存在
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  // 写入 API Key 到文件
  fs.writeFileSync(keyFilePath, apiKey, 'utf-8')
  console.log(`✅ API Key 验证文件已创建: public/${apiKey}.txt`)
}

// 更新 .gitignore
function updateGitignore() {
  const gitignorePath = path.join(process.cwd(), '.gitignore')
  
  if (fs.existsSync(gitignorePath)) {
    let gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8')
    
    // 检查是否已经包含 IndexNow 相关规则
    if (!gitignoreContent.includes('# IndexNow')) {
      gitignoreContent += '\n# IndexNow API Key files\n*.txt\n!public/*.txt\n'
      fs.writeFileSync(gitignorePath, gitignoreContent)
      console.log('✅ .gitignore 已更新')
    }
  }
}

// 主函数
function main() {
  console.log('🚀 开始设置 IndexNow API...\n')

  try {
    // 1. 获取或创建 API Key
    const apiKey = getOrCreateApiKey()

    // 2. 创建验证文件
    createKeyFile(apiKey)

    // 3. 更新 .gitignore
    updateGitignore()

    console.log('\n✅ IndexNow 设置完成！\n')
    console.log('📋 下一步操作：')
    console.log('1. 确保 public/' + apiKey + '.txt 文件可以通过 https://herbscience.shop/' + apiKey + '.txt 访问')
    console.log('2. 重启开发服务器: npm run dev')
    console.log('3. 测试 IndexNow API: POST https://herbscience.shop/api/indexnow')
    console.log('   Body: { "url": "https://herbscience.shop/" }')
    console.log('\n📖 IndexNow 文档: https://www.indexnow.org/documentation')
  } catch (error) {
    console.error('❌ 设置失败:', error.message)
    process.exit(1)
  }
}

// 运行脚本
main()

