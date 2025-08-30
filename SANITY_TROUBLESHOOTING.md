# 🌿 Sanity CMS 连接问题解决指南

## 🔍 问题诊断

我们发现了草药详情页面404问题的根本原因：

```
Error: Dataset not found - Dataset "production" not found for project ID "your-project-id"
```

这是因为Sanity客户端尝试使用默认的占位符ID连接，而不是检测到配置无效时跳过连接尝试。

## 🛠️ 已实施的修复

1. **增强Sanity配置检测**
   - 添加了`isValidConfig`检查机制
   - 在无效配置时立即抛出明确错误

2. **优化数据获取流程**
   - 只有在有效配置时才尝试连接Sanity
   - 无效配置时直接使用静态数据

3. **改进路由生成**
   - 智能检测Sanity配置状态
   - 配置无效时直接使用静态数据生成路由

## 📋 立即解决方案

### 方案A: 创建有效的环境配置（推荐）

1. **创建环境变量文件**
   ```bash
   # 在项目根目录创建.env.local文件，内容如下：
   
   # Sanity CMS 配置
   NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder-project-id-123456789
   NEXT_PUBLIC_SANITY_DATASET=development
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=placeholder-token
   
   # 部署配置
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NODE_ENV=development
   ```

2. **重启开发服务器**
   ```bash
   npm run dev
   ```

### 方案B: 临时禁用Sanity（如果方案A不起作用）

如果您仍然遇到问题，可以尝试以下方法：

1. **清除缓存**
   ```bash
   rm -rf .next
   ```

2. **强制使用静态数据**
   - 代码已经添加了智能检测逻辑
   - 将自动回退到静态数据库

## 🔄 验证修复

访问以下页面测试修复效果：
- http://localhost:3000/herbs/ginseng
- http://localhost:3000/herbs/ginger  
- http://localhost:3000/herbs/turmeric

## 🧩 技术细节

### 配置检测逻辑

```typescript
// 检查Sanity配置是否有效
const isValidConfig = 
  projectId && 
  projectId !== 'your-project-id' && 
  projectId !== 'your-project-id-here' && 
  projectId.length > 8
```

### 数据获取流程

```typescript
// 仅在Sanity正确配置时尝试获取数据
if (isValidConfig) {
  try {
    // 尝试从Sanity获取
  } catch (error) {
    // 错误处理
  }
} else {
  // 直接使用静态数据
}
```

## 🔮 长期解决方案

1. **完成Sanity项目设置**
   - 按照`SANITY_SETUP_GUIDE.md`指南完成配置
   - 获取真实的Project ID和API Token

2. **更新环境变量**
   - 使用真实的Sanity项目信息替换占位符
   - 重启开发服务器

3. **导入草药数据**
   - 使用迁移脚本将静态数据导入Sanity
   - 参考`HERBS_MIGRATION_GUIDE.md`

## 📞 需要进一步帮助？

如果您仍然遇到问题，请尝试以下操作：

1. 检查浏览器控制台完整错误信息
2. 验证`.env.local`文件是否正确创建
3. 确认开发服务器已完全重启
