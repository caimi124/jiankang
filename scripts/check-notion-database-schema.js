// 检查Notion数据库结构
const { Client } = require('@notionhq/client')

const notion = new Client({
  auth: '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'
})

const databaseId = '21b6f14b923c80e5a851dc0e82f8f349'

async function checkDatabaseSchema() {
  try {
    console.log('🔍 检查Notion数据库结构...')
    
    const database = await notion.databases.retrieve({
      database_id: databaseId
    })
    
    console.log('\n📊 数据库信息:')
    console.log(`名称: ${database.title[0]?.plain_text || '未命名'}`)
    console.log(`ID: ${database.id}`)
    
    console.log('\n📝 属性列表:')
    Object.entries(database.properties).forEach(([key, property]) => {
      console.log(`- ${key}: ${property.type}`)
    })
    
    console.log('\n✅ 数据库结构检查完成!')
    
  } catch (error) {
    console.error('❌ 检查失败:', error.message)
  }
}

if (require.main === module) {
  checkDatabaseSchema()
}

module.exports = { checkDatabaseSchema } 