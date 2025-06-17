const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

class NotionDatabaseManager {
  constructor() {
    this.databaseId = process.env.NOTION_DATABASE_ID;
  }

  // 获取数据库信息
  async getDatabaseInfo() {
    try {
      const response = await notion.databases.retrieve({
        database_id: this.databaseId
      });
      
      console.log("📊 数据库信息:");
      console.log(`名称: ${response.title?.[0]?.plain_text || '无标题'}`);
      console.log(`创建时间: ${response.created_time}`);
      console.log(`最后编辑: ${response.last_edited_time}`);
      console.log("字段列表:");
      
      Object.entries(response.properties).forEach(([name, prop]) => {
        console.log(`  - ${name}: ${prop.type}`);
        
        // 显示选择字段的选项
        if (prop.type === 'select' && prop.select.options) {
          console.log(`    选项: ${prop.select.options.map(opt => opt.name).join(', ')}`);
        }
        if (prop.type === 'multi_select' && prop.multi_select.options) {
          console.log(`    选项: ${prop.multi_select.options.map(opt => opt.name).join(', ')}`);
        }
      });
      
      return response;
      
    } catch (error) {
      console.error("❌ 获取数据库信息失败:", error.message);
      throw error;
    }
  }

  // 获取所有草药条目
  async getAllHerbs() {
    try {
      console.log("📋 获取所有草药条目...");
      
      const response = await notion.databases.query({
        database_id: this.databaseId,
        sorts: [
          {
            property: '草药名称',
            direction: 'ascending'
          }
        ]
      });
      
      console.log(`找到 ${response.results.length} 个草药条目`);
      
      response.results.forEach((page, index) => {
        const title = page.properties['草药名称']?.title?.[0]?.plain_text || '无标题';
        const chineseName = page.properties['中文名']?.rich_text?.[0]?.plain_text || '';
        const safety = page.properties['安全性等级']?.select?.name || '';
        const constitution = page.properties['中医体质匹配']?.select?.name || '';
        
        console.log(`${index + 1}. ${title} (${chineseName}) - 安全性: ${safety}, 体质: ${constitution}`);
      });
      
      return response.results;
      
    } catch (error) {
      console.error("❌ 获取草药条目失败:", error.message);
      throw error;
    }
  }

  // 按安全性等级分组统计
  async getStatsByCategory() {
    try {
      console.log("\n📈 按分类统计草药数据...");
      
      const herbs = await this.getAllHerbs();
      
      // 按安全性等级统计
      const safetyStats = {};
      const constitutionStats = {};
      const efficacyStats = {};
      
      herbs.forEach(herb => {
        // 安全性统计
        const safety = herb.properties['安全性等级']?.select?.name;
        if (safety) {
          safetyStats[safety] = (safetyStats[safety] || 0) + 1;
        }
        
        // 体质统计
        const constitution = herb.properties['中医体质匹配']?.select?.name;
        if (constitution) {
          constitutionStats[constitution] = (constitutionStats[constitution] || 0) + 1;
        }
        
        // 功效统计
        const efficacies = herb.properties['功效分类']?.multi_select || [];
        efficacies.forEach(efficacy => {
          efficacyStats[efficacy.name] = (efficacyStats[efficacy.name] || 0) + 1;
        });
      });
      
      console.log("\n🛡️ 按安全性等级分布:");
      Object.entries(safetyStats).forEach(([level, count]) => {
        console.log(`  ${level}: ${count} 种草药`);
      });
      
      console.log("\n🏥 按中医体质分布:");
      Object.entries(constitutionStats).forEach(([constitution, count]) => {
        console.log(`  ${constitution}: ${count} 种草药`);
      });
      
      console.log("\n💊 按功效分类分布:");
      Object.entries(efficacyStats)
        .sort(([,a], [,b]) => b - a)
        .forEach(([efficacy, count]) => {
          console.log(`  ${efficacy}: ${count} 种草药`);
        });
      
      return { safetyStats, constitutionStats, efficacyStats };
      
    } catch (error) {
      console.error("❌ 统计分析失败:", error.message);
      throw error;
    }
  }

  // 创建高级查询示例
  async performAdvancedQueries() {
    try {
      console.log("\n🔍 执行高级查询示例...");
      
      // 查询高安全性的草药
      console.log("\n1️⃣ 查询高安全性草药:");
      const highSafetyHerbs = await notion.databases.query({
        database_id: this.databaseId,
        filter: {
          property: '安全性等级',
          select: {
            equals: '高'
          }
        }
      });
      
      console.log(`找到 ${highSafetyHerbs.results.length} 种高安全性草药:`);
      highSafetyHerbs.results.forEach((herb, index) => {
        const title = herb.properties['草药名称']?.title?.[0]?.plain_text;
        const chineseName = herb.properties['中文名']?.rich_text?.[0]?.plain_text;
        console.log(`  ${index + 1}. ${title} (${chineseName})`);
      });
      
      // 查询特定功效的草药
      console.log("\n2️⃣ 查询消化健康相关草药:");
      const digestiveHerbs = await notion.databases.query({
        database_id: this.databaseId,
        filter: {
          property: '功效分类',
          multi_select: {
            contains: '消化健康'
          }
        }
      });
      
      console.log(`找到 ${digestiveHerbs.results.length} 种消化健康相关草药:`);
      digestiveHerbs.results.forEach((herb, index) => {
        const title = herb.properties['草药名称']?.title?.[0]?.plain_text;
        const chineseName = herb.properties['中文名']?.rich_text?.[0]?.plain_text;
        console.log(`  ${index + 1}. ${title} (${chineseName})`);
      });
      
      // 查询特定体质的草药
      console.log("\n3️⃣ 查询湿热体质适用草药:");
      const dampHeatHerbs = await notion.databases.query({
        database_id: this.databaseId,
        filter: {
          property: '中医体质匹配',
          select: {
            equals: '湿热体质'
          }
        }
      });
      
      console.log(`找到 ${dampHeatHerbs.results.length} 种湿热体质适用草药:`);
      dampHeatHerbs.results.forEach((herb, index) => {
        const title = herb.properties['草药名称']?.title?.[0]?.plain_text;
        const chineseName = herb.properties['中文名']?.rich_text?.[0]?.plain_text;
        console.log(`  ${index + 1}. ${title} (${chineseName})`);
      });
      
      return {
        highSafetyHerbs: highSafetyHerbs.results,
        digestiveHerbs: digestiveHerbs.results,
        dampHeatHerbs: dampHeatHerbs.results
      };
      
    } catch (error) {
      console.error("❌ 高级查询失败:", error.message);
      throw error;
    }
  }

  // 更新草药条目（示例）
  async updateHerbEntry(herbId, updates) {
    try {
      console.log(`📝 更新草药条目: ${herbId}`);
      
      const response = await notion.pages.update({
        page_id: herbId,
        properties: updates
      });
      
      console.log("✅ 更新成功!");
      return response;
      
    } catch (error) {
      console.error("❌ 更新草药条目失败:", error.message);
      throw error;
    }
  }

  // 导出数据为CSV格式
  async exportToCSV() {
    try {
      console.log("\n📤 导出数据为CSV格式...");
      
      const herbs = await this.getAllHerbs();
      
      const csvHeaders = [
        '草药名称',
        '中文名',
        '简要描述',
        '成分构成',
        '功效分类',
        '使用建议',
        '安全性等级',
        '注意事项',
        '中医体质匹配',
        '案例分析'
      ];
      
      const csvRows = herbs.map(herb => {
        const props = herb.properties;
        return [
          props['草药名称']?.title?.[0]?.plain_text || '',
          props['中文名']?.rich_text?.[0]?.plain_text || '',
          props['简要描述']?.rich_text?.[0]?.plain_text || '',
          props['成分构成']?.multi_select?.map(item => item.name).join('; ') || '',
          props['功效分类']?.multi_select?.map(item => item.name).join('; ') || '',
          props['使用建议']?.rich_text?.[0]?.plain_text || '',
          props['安全性等级']?.select?.name || '',
          props['注意事项']?.rich_text?.[0]?.plain_text || '',
          props['中医体质匹配']?.select?.name || '',
          props['案例分析']?.rich_text?.[0]?.plain_text || ''
        ].map(field => `"${field.replace(/"/g, '""')}"`);
      });
      
      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.join(','))
      ].join('\n');
      
      const fs = require('fs');
      const filename = `herbs_database_export_${new Date().toISOString().split('T')[0]}.csv`;
      fs.writeFileSync(filename, csvContent, 'utf8');
      
      console.log(`✅ 数据已导出到: ${filename}`);
      console.log(`📊 导出了 ${herbs.length} 条草药记录`);
      
      return filename;
      
    } catch (error) {
      console.error("❌ 导出CSV失败:", error.message);
      throw error;
    }
  }

  // 生成数据库分析报告
  async generateAnalysisReport() {
    try {
      console.log("\n📋 生成数据库分析报告...");
      
      const dbInfo = await this.getDatabaseInfo();
      const herbs = await this.getAllHerbs();
      const stats = await this.getStatsByCategory();
      
      const report = {
        database: {
          name: dbInfo.title?.[0]?.plain_text || '草药数据库',
          totalEntries: herbs.length,
          createdTime: dbInfo.created_time,
          lastEditTime: dbInfo.last_edited_time
        },
        statistics: stats,
        fieldAnalysis: {
          totalFields: Object.keys(dbInfo.properties).length,
          fieldTypes: Object.entries(dbInfo.properties).reduce((acc, [name, prop]) => {
            acc[prop.type] = (acc[prop.type] || 0) + 1;
            return acc;
          }, {})
        },
        timestamp: new Date().toISOString()
      };
      
      const fs = require('fs');
      const reportFilename = `herbs_database_analysis_${new Date().toISOString().split('T')[0]}.json`;
      fs.writeFileSync(reportFilename, JSON.stringify(report, null, 2), 'utf8');
      
      console.log(`📊 分析报告已生成: ${reportFilename}`);
      
      return report;
      
    } catch (error) {
      console.error("❌ 生成分析报告失败:", error.message);
      throw error;
    }
  }
}

// 主函数
async function main() {
  console.log("🗃️ Notion草药数据库管理工具\n");
  
  const dbManager = new NotionDatabaseManager();
  
  try {
    // 获取数据库基本信息
    await dbManager.getDatabaseInfo();
    
    console.log("\n" + "=".repeat(60));
    
    // 获取所有条目
    await dbManager.getAllHerbs();
    
    console.log("\n" + "=".repeat(60));
    
    // 统计分析
    await dbManager.getStatsByCategory();
    
    console.log("\n" + "=".repeat(60));
    
    // 高级查询示例
    await dbManager.performAdvancedQueries();
    
    console.log("\n" + "=".repeat(60));
    
    // 导出CSV
    await dbManager.exportToCSV();
    
    console.log("\n" + "=".repeat(60));
    
    // 生成分析报告
    await dbManager.generateAnalysisReport();
    
    console.log("\n🎉 数据库管理操作完成!");
    console.log("\n💡 接下来您可以:");
    console.log("   1. 在Notion中创建自定义视图");
    console.log("   2. 设置过滤器和排序规则");
    console.log("   3. 添加更多草药条目");
    console.log("   4. 创建仪表板和报表");
    
  } catch (error) {
    console.error("❌ 操作失败:", error.message);
  }
}

// 执行主函数
if (require.main === module) {
  main();
}

module.exports = { NotionDatabaseManager }; 