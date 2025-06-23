// 实时博客同步监控服务
// 监控博客文章变化并自动同步到Notion

const { simpleNotionBlogSync } = require('../lib/notion-blog-sync-simple.js')
const fs = require('fs')
const path = require('path')

class RealTimeBlogSync {
  constructor() {
    this.blogDirectory = path.join(__dirname, '..', 'app', 'blog')
    this.watchedFiles = new Map() // 存储文件的最后修改时间
    this.syncInterval = 5 * 60 * 1000 // 5分钟检查一次
    this.isRunning = false
  }

  // 启动实时监控
  start() {
    if (this.isRunning) {
      console.log('⚠️ 实时同步服务已在运行')
      return
    }

    this.isRunning = true
    console.log('🚀 启动实时博客同步监控服务')
    console.log(`📁 监控目录: ${this.blogDirectory}`)
    console.log(`⏰ 检查间隔: ${this.syncInterval / 1000}秒`)

    // 立即执行一次扫描
    this.scanAndSync()

    // 设置定时器
    this.intervalId = setInterval(() => {
      this.scanAndSync()
    }, this.syncInterval)

    console.log('✅ 实时同步监控服务启动成功')
  }

  // 停止监控
  stop() {
    if (!this.isRunning) {
      console.log('⚠️ 实时同步服务未在运行')
      return
    }

    this.isRunning = false
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }

    console.log('🛑 实时同步监控服务已停止')
  }

  // 扫描博客文件并同步变化
  async scanAndSync() {
    try {
      console.log('🔍 扫描博客文件变化...')
      
      const changedFiles = await this.detectChangedFiles()
      
      if (changedFiles.length === 0) {
        console.log('📝 未检测到文件变化')
        return
      }

      console.log(`🔄 检测到 ${changedFiles.length} 个文件变化:`)
      changedFiles.forEach(file => {
        console.log(`  - ${file}`)
      })

      // 特殊处理姜黄文章
      const turmericChanged = changedFiles.some(file => 
        file.includes('turmeric-gut-relief-guide')
      )

      if (turmericChanged) {
        console.log('🌿 检测到姜黄文章变化，同步到Notion...')
        await this.syncTurmericArticle()
      }

      // 更新文件监控记录
      this.updateWatchedFiles()

    } catch (error) {
      console.error('❌ 扫描同步过程出错:', error)
    }
  }

  // 检测变化的文件
  async detectChangedFiles() {
    const changedFiles = []
    
    try {
      // 扫描博客目录
      const entries = await fs.promises.readdir(this.blogDirectory, { withFileTypes: true })
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const dirPath = path.join(this.blogDirectory, entry.name)
          const pageFile = path.join(dirPath, 'page.tsx')
          
          if (fs.existsSync(pageFile)) {
            const stats = await fs.promises.stat(pageFile)
            const currentMtime = stats.mtime.getTime()
            const lastMtime = this.watchedFiles.get(pageFile)
            
            if (!lastMtime || currentMtime > lastMtime) {
              changedFiles.push(pageFile)
              this.watchedFiles.set(pageFile, currentMtime)
            }
          }
        }
      }
    } catch (error) {
      console.error('扫描博客目录失败:', error)
    }

    return changedFiles
  }

  // 更新监控文件记录
  updateWatchedFiles() {
    // 已在detectChangedFiles中更新
  }

  // 同步姜黄文章到Notion
  async syncTurmericArticle() {
    try {
      // 重用之前的同步逻辑
      const { syncTurmericBlogPost } = require('./sync-turmeric-blog-to-notion.js')
      await syncTurmericBlogPost()
    } catch (error) {
      console.error('姜黄文章同步失败:', error)
    }
  }

  // 获取同步状态
  getStatus() {
    return {
      isRunning: this.isRunning,
      watchedFilesCount: this.watchedFiles.size,
      lastCheck: new Date().toISOString(),
      syncInterval: this.syncInterval
    }
  }
}

// 全局实例
const realTimeBlogSync = new RealTimeBlogSync()

// 如果直接运行此脚本
if (require.main === module) {
  console.log('🌟 实时博客同步服务')
  
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'start':
      realTimeBlogSync.start()
      // 保持进程运行
      process.on('SIGINT', () => {
        console.log('\n📋 收到停止信号...')
        realTimeBlogSync.stop()
        process.exit(0)
      })
      break

    case 'stop':
      realTimeBlogSync.stop()
      break

    case 'status':
      console.log('📊 同步状态:', realTimeBlogSync.getStatus())
      break

    case 'sync':
      console.log('🔄 手动执行同步...')
      realTimeBlogSync.scanAndSync().then(() => {
        console.log('✅ 手动同步完成')
        process.exit(0)
      })
      break

    default:
      console.log('📖 使用方法:')
      console.log('  node scripts/real-time-blog-sync.js start   # 启动实时监控')
      console.log('  node scripts/real-time-blog-sync.js stop    # 停止监控')
      console.log('  node scripts/real-time-blog-sync.js status  # 查看状态')
      console.log('  node scripts/real-time-blog-sync.js sync    # 手动同步')
      break
  }
}

module.exports = {
  RealTimeBlogSync,
  realTimeBlogSync
} 