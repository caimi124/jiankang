# HerbScience.shop - 中草药补充剂网站

## 项目简介

HerbScience.shop 是一个专业的中草药补充剂英文网站，旨在为海外用户提供：

- 🌿 **按症状找草药** - 智能推荐系统
- 🛡️ **成分安全性检查** - 副作用分析工具  
- 📚 **中草药知识库** - 科学研究支持
- 🧠 **AI体质问卷** - 个性化推荐

## 技术栈

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **TypeScript**: 完整类型支持
- **部署**: Vercel (推荐)

## 功能特点

### SEO 优化
- 完整的元数据配置
- 结构化数据标记
- 语义化 HTML
- 移动端优化

### 用户体验
- 响应式设计
- 现代化 UI/UX
- 流畅的动画效果
- 无障碍访问支持

### 核心模块
1. **首页** - Hero 区块 + 功能展示
2. **工具页面** - 各功能模块的详细页面
3. **知识库** - 文章和研究内容
4. **AI 问卷** - 个性化推荐系统

## 快速开始

### 1. 安装依赖
```bash
npm install
# 或
yarn install
```

### 2. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

### 3. 访问网站
打开 [http://localhost:3000](http://localhost:3000) 查看网站。

## 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中连接你的 GitHub 仓库
3. 自动部署完成

或使用 Vercel CLI：
```bash
npm install -g vercel
vercel
```

## 项目结构

```
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # 可复用组件 (待添加)
├── public/               # 静态资源
├── next.config.js        # Next.js 配置
├── tailwind.config.js    # Tailwind 配置
└── tsconfig.json         # TypeScript 配置
```

## 开发计划

### Phase 1 - 基础功能 ✅
- [x] 网站首页设计
- [x] SEO 优化配置
- [x] 响应式布局

### Phase 2 - 核心工具 (开发中)
- [ ] 症状草药查找器
- [ ] 成分安全检查器
- [ ] 知识库系统
- [ ] AI 体质问卷

### Phase 3 - 高级功能
- [ ]用户系统
- [ ] 个性化推荐
- [ ] 多语言支持
- [ ] 付费功能

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 注意事项

- 本网站仅供教育用途，不构成医疗建议
- 使用前请咨询专业医疗人士
- 所有内容基于传统医学理论和现代科学研究

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- 网站: [https://herbscience.shop](https://herbscience.shop)
- 邮箱: info@herbscience.shop

---

© 2025 HerbScience.shop - All Rights Reserved 