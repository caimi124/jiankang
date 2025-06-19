const { Client } = require("@notionhq/client");
const fs = require('fs');
const path = require('path');

// Notion集成配置
const notion = new Client({ 
  auth: "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" 
});

const databaseId = "2156f14b923c802c8d48d84247b6681a";

// 数据维护工具类
class HerbsDatabaseMaintenance {
  constructor() {
    this.backupDir = './backups';
    this.ensureBackupDir();
  }

  // 确保备份目录存在
  ensureBackupDir() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  // 1. 数据备份
  async backupDatabase() {
    try {
      console.log('🔄 开始备份草药数据库...');
      
      const response = await notion.databases.query({
        database_id: databaseId,
        page_size: 100
      });

      const backup = {
        timestamp: new Date().toISOString(),
        totalHerbs: response.results.length,
        herbs: response.results.map(page => ({
          id: page.id,
          properties: page.properties,
          url: page.url,
          lastEdited: page.last_edited_time
        }))
      };

      const filename = `herbs-backup-${new Date().toISOString().split('T')[0]}.json`;
      const filepath = path.join(this.backupDir, filename);
      
      fs.writeFileSync(filepath, JSON.stringify(backup, null, 2));
      
      console.log(`✅ 备份完成！`);
      console.log(`📁 文件位置: ${filepath}`);
      console.log(`📊 备份了 ${backup.totalHerbs} 种草药`);
      
      return { success: true, filepath, count: backup.totalHerbs };
    } catch (error) {
      console.error('❌ 备份失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 2. 数据统计分析
  async analyzeDatabase() {
    try {
      console.log('📊 分析草药数据库...');
      
      const response = await notion.databases.query({
        database_id: databaseId,
        page_size: 100
      });

      const herbs = response.results;
      const analysis = {
        总数量: herbs.length,
        按体质分类: {},
        按功效分类: {},
        按安全性分类: {},
        数据完整性: {
          有中文名: 0,
          有功效分类: 0,
          有剂量信息: 0,
          有安全性评级: 0,
          有注意事项: 0
        }
      };

      herbs.forEach(herb => {
        const props = herb.properties;
        
        // 体质分类统计
        const constitution = props['中医体质匹配']?.select?.name;
        if (constitution) {
          analysis.按体质分类[constitution] = (analysis.按体质分类[constitution] || 0) + 1;
        }

        // 功效分类统计
        const efficacies = props['功效分类']?.multi_select || [];
        efficacies.forEach(eff => {
          analysis.按功效分类[eff.name] = (analysis.按功效分类[eff.name] || 0) + 1;
        });

        // 安全性分类统计
        const safety = props['安全性等级']?.select?.name;
        if (safety) {
          analysis.按安全性分类[safety] = (analysis.按安全性分类[safety] || 0) + 1;
        }

        // 数据完整性检查
        if (this.hasContent(props['中文名']?.rich_text)) analysis.数据完整性.有中文名++;
        if (props['功效分类']?.multi_select?.length > 0) analysis.数据完整性.有功效分类++;
        if (this.hasContent(props['推荐剂量']?.rich_text)) analysis.数据完整性.有剂量信息++;
        if (props['安全性等级']?.select?.name) analysis.数据完整性.有安全性评级++;
        if (this.hasContent(props['注意事项']?.rich_text)) analysis.数据完整性.有注意事项++;
      });

      // 计算完整性百分比
      Object.keys(analysis.数据完整性).forEach(key => {
        const count = analysis.数据完整性[key];
        analysis.数据完整性[key] = `${count}/${herbs.length} (${Math.round(count / herbs.length * 100)}%)`;
      });

      console.log('\n📋 数据库分析报告');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📊 总数量: ${analysis.总数量}`);
      
      console.log('\n🏥 按中医体质分类:');
      Object.entries(analysis.按体质分类).forEach(([type, count]) => {
        console.log(`  ${type}: ${count}`);
      });

      console.log('\n💊 按功效分类 (Top 10):');
      Object.entries(analysis.按功效分类)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .forEach(([eff, count]) => {
          console.log(`  ${eff}: ${count}`);
        });

      console.log('\n🛡️ 按安全性分类:');
      Object.entries(analysis.按安全性分类).forEach(([level, count]) => {
        console.log(`  ${level}: ${count}`);
      });

      console.log('\n📈 数据完整性:');
      Object.entries(analysis.数据完整性).forEach(([field, percentage]) => {
        console.log(`  ${field}: ${percentage}`);
      });

      // 保存分析报告
      const reportFile = path.join(this.backupDir, `analysis-${new Date().toISOString().split('T')[0]}.json`);
      fs.writeFileSync(reportFile, JSON.stringify(analysis, null, 2));
      console.log(`\n💾 详细报告已保存到: ${reportFile}`);

      return analysis;
    } catch (error) {
      console.error('❌ 分析失败:', error);
      return null;
    }
  }

  // 3. 数据清理和标准化
  async cleanAndStandardizeData() {
    try {
      console.log('🧹 开始数据清理和标准化...');
      
      const response = await notion.databases.query({
        database_id: databaseId,
        page_size: 100
      });

      let cleanedCount = 0;
      const issues = [];

      for (const page of response.results) {
        const props = page.properties;
        const updates = {};
        let needsUpdate = false;

        // 检查并清理中文名
        const chineseName = this.extractText(props['中文名']?.rich_text);
        if (chineseName && chineseName.includes('待翻译')) {
          issues.push(`草药 ${this.extractText(props['草药名称']?.title)} 需要中文翻译`);
        }

        // 检查必填字段
        if (!this.hasContent(props['简要描述']?.rich_text)) {
          issues.push(`草药 ${this.extractText(props['草药名称']?.title)} 缺少简要描述`);
        }

        if (!props['安全性等级']?.select?.name) {
          issues.push(`草药 ${this.extractText(props['草药名称']?.title)} 缺少安全性等级`);
        }

        // 如果有更新，应用到页面
        if (needsUpdate) {
          await notion.pages.update({
            page_id: page.id,
            properties: updates
          });
          cleanedCount++;
        }
      }

      console.log(`✅ 数据清理完成！`);
      console.log(`📊 处理了 ${cleanedCount} 个页面`);
      
      if (issues.length > 0) {
        console.log(`\n⚠️ 发现 ${issues.length} 个需要人工处理的问题:`);
        issues.slice(0, 10).forEach(issue => console.log(`  - ${issue}`));
        if (issues.length > 10) {
          console.log(`  ... 还有 ${issues.length - 10} 个问题`);
        }
      }

      return { cleanedCount, issues };
    } catch (error) {
      console.error('❌ 数据清理失败:', error);
      return null;
    }
  }

  // 4. 批量更新功能分类
  async updateEfficacyCategories() {
    try {
      console.log('🏷️ 批量更新功效分类...');
      
      // 标准化的功效分类映射
      const efficacyMapping = {
        '消化': '消化健康',
        '免疫': '免疫支持',
        '肝脏': '肝脏健康',
        '呼吸': '呼吸系统',
        '镇静': '镇静安神',
        '抗炎': '抗炎作用',
        '解毒': '解毒支持',
        '补血': '补气养血',
        '止咳': '止咳化痰'
      };

      const response = await notion.databases.query({
        database_id: databaseId,
        page_size: 100
      });

      let updatedCount = 0;

      for (const page of response.results) {
        const props = page.properties;
        const currentEfficacies = props['功效分类']?.multi_select || [];
        let needsUpdate = false;
        const newEfficacies = [...currentEfficacies];

        // 检查是否需要标准化
        currentEfficacies.forEach((eff, index) => {
          if (efficacyMapping[eff.name]) {
            newEfficacies[index] = { name: efficacyMapping[eff.name] };
            needsUpdate = true;
          }
        });

        if (needsUpdate) {
          await notion.pages.update({
            page_id: page.id,
            properties: {
              '功效分类': {
                multi_select: newEfficacies
              }
            }
          });
          updatedCount++;
        }
      }

      console.log(`✅ 功效分类更新完成！更新了 ${updatedCount} 个页面`);
      return updatedCount;
    } catch (error) {
      console.error('❌ 功效分类更新失败:', error);
      return 0;
    }
  }

  // 5. 生成维护报告
  async generateMaintenanceReport() {
    try {
      console.log('📄 生成维护报告...');
      
      const backup = await this.backupDatabase();
      const analysis = await this.analyzeDatabase();
      
      const report = {
        timestamp: new Date().toISOString(),
        备份状态: backup.success ? '成功' : '失败',
        数据分析: analysis,
        建议操作: []
      };

      // 基于分析生成建议
      if (analysis) {
        const totalHerbs = analysis.总数量;
        const completenessIssues = [];

        Object.entries(analysis.数据完整性).forEach(([field, percentage]) => {
          const percent = parseInt(percentage.match(/\((\d+)%\)/)?.[1] || '0');
          if (percent < 80) {
            completenessIssues.push(`${field}: 只有${percent}%的数据完整`);
          }
        });

        if (completenessIssues.length > 0) {
          report.建议操作.push('数据完整性需要改善');
          report.建议操作.push(...completenessIssues);
        }

        if (totalHerbs < 50) {
          report.建议操作.push('建议扩展草药数据库，目标100+种草药');
        }
      }

      const reportFile = path.join(this.backupDir, `maintenance-report-${new Date().toISOString().split('T')[0]}.json`);
      fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));

      console.log(`📋 维护报告已生成: ${reportFile}`);
      return report;
    } catch (error) {
      console.error('❌ 生成维护报告失败:', error);
      return null;
    }
  }

  // 工具方法
  extractText(textProperty) {
    if (!textProperty || !Array.isArray(textProperty)) return '';
    return textProperty.map(item => item.text?.content || item.plain_text || '').join('');
  }

  hasContent(textProperty) {
    const text = this.extractText(textProperty);
    return text && text.trim() !== '' && text.trim() !== '待补充' && text.trim() !== '待翻译';
  }
}

// 命令行界面
async function runMaintenance() {
  const maintenance = new HerbsDatabaseMaintenance();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'backup':
      await maintenance.backupDatabase();
      break;
      
    case 'analyze':
      await maintenance.analyzeDatabase();
      break;
      
    case 'clean':
      await maintenance.cleanAndStandardizeData();
      break;
      
    case 'update-efficacy':
      await maintenance.updateEfficacyCategories();
      break;
      
    case 'report':
      await maintenance.generateMaintenanceReport();
      break;
      
    case 'full':
      console.log('🚀 开始完整维护流程...\n');
      await maintenance.backupDatabase();
      console.log('\n');
      await maintenance.analyzeDatabase();
      console.log('\n');
      await maintenance.cleanAndStandardizeData();
      console.log('\n');
      await maintenance.generateMaintenanceReport();
      console.log('\n✅ 完整维护流程完成！');
      break;
      
    default:
      console.log(`
🌿 草药数据库维护工具

使用方法: node herbs-database-maintenance.js <命令>

可用命令:
  backup          - 备份数据库
  analyze         - 分析数据库统计
  clean           - 清理和标准化数据
  update-efficacy - 更新功效分类
  report          - 生成维护报告
  full            - 运行完整维护流程

示例:
  node herbs-database-maintenance.js backup
  node herbs-database-maintenance.js analyze
  node herbs-database-maintenance.js full
      `);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  runMaintenance().catch(console.error);
}

module.exports = HerbsDatabaseMaintenance; 