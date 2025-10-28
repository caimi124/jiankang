# Pickled Onion Blog 快速部署脚本 (PowerShell)
# 使用方法: 在PowerShell中运行 .\QUICK_DEPLOY_PICKLED_ONION.ps1

Write-Host "🧅 Pickled Onion Blog 快速部署" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# 检查环境变量文件
if (-Not (Test-Path ".env.local")) {
    Write-Host "⚠️  未找到 .env.local 文件" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "请选择部署方式:" -ForegroundColor White
    Write-Host "1. 配置Sanity API Token并自动部署 (推荐)" -ForegroundColor Green
    Write-Host "2. 手动在Sanity Studio添加内容" -ForegroundColor Yellow
    Write-Host ""
    
    $choice = Read-Host "请输入选项 (1 或 2)"
    
    if ($choice -eq "1") {
        Write-Host ""
        Write-Host "📝 步骤1: 获取Sanity API Token" -ForegroundColor Cyan
        Write-Host "1. 访问: https://www.sanity.io/manage/personal/tokens" -ForegroundColor White
        Write-Host "2. 点击 'Add API token'" -ForegroundColor White
        Write-Host "3. Label: HerbScience Blog Deployment" -ForegroundColor White
        Write-Host "4. Permissions: Editor" -ForegroundColor White
        Write-Host "5. 复制生成的token" -ForegroundColor White
        Write-Host ""
        
        $token = Read-Host "请粘贴你的Sanity API Token"
        
        # 创建.env.local文件
        $envContent = @"
# Sanity CMS 配置
NEXT_PUBLIC_SANITY_PROJECT_ID=13rzzwgz
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API Token
SANITY_API_TOKEN=$token

# Next.js 配置
NEXT_PUBLIC_SITE_URL=https://herbscience.shop
"@
        
        $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
        Write-Host ""
        Write-Host "✅ .env.local 文件已创建" -ForegroundColor Green
        Write-Host ""
        
        # 运行部署脚本
        Write-Host "🚀 正在部署博客文章..." -ForegroundColor Cyan
        node add-pickled-onion-blog-to-sanity.js
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "🎉 部署成功!" -ForegroundColor Green
            Write-Host ""
            Write-Host "请访问以下URL验证:" -ForegroundColor Cyan
            Write-Host "- 前端网站: https://herbscience.shop/blog/pickled-onion-benefits" -ForegroundColor White
            Write-Host "- Sanity Studio: https://herbscience.sanity.studio" -ForegroundColor White
        } else {
            Write-Host ""
            Write-Host "❌ 部署失败，请检查错误信息" -ForegroundColor Red
            Write-Host "请参考 PICKLED_ONION_BLOG_DEPLOYMENT_GUIDE.md 获取帮助" -ForegroundColor Yellow
        }
        
    } elseif ($choice -eq "2") {
        Write-Host ""
        Write-Host "📖 手动部署指南" -ForegroundColor Cyan
        Write-Host "================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "步骤1: 启动Sanity Studio" -ForegroundColor Yellow
        Write-Host "cd sanity" -ForegroundColor White
        Write-Host "npm install" -ForegroundColor White
        Write-Host "npm run dev" -ForegroundColor White
        Write-Host ""
        Write-Host "步骤2: 访问 http://localhost:3333" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "步骤3: 创建新的Blog Post" -ForegroundColor Yellow
        Write-Host "- 点击 'Blog Posts' -> 'Create'" -ForegroundColor White
        Write-Host "- 标题: Pickled Onion Benefits: Gut Health, Antioxidants, and More" -ForegroundColor White
        Write-Host "- Slug: pickled-onion-benefits" -ForegroundColor White
        Write-Host ""
        Write-Host "完整内容请查看:" -ForegroundColor Yellow
        Write-Host "PICKLED_ONION_BLOG_DEPLOYMENT_GUIDE.md" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "❌ 无效选项" -ForegroundColor Red
    }
    
} else {
    Write-Host "✅ 找到 .env.local 文件" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 正在部署博客文章..." -ForegroundColor Cyan
    Write-Host ""
    
    node add-pickled-onion-blog-to-sanity.js
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "🎉 部署成功!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 SEO效果预测:" -ForegroundColor Cyan
        Write-Host "- KGR: 0.69 (黄金级机会!)" -ForegroundColor Green
        Write-Host "- 2-3周进入Google前20位" -ForegroundColor White
        Write-Host "- 6-8周进入前10位" -ForegroundColor White
        Write-Host "- 预期月流量: 60-100次访问" -ForegroundColor White
        Write-Host ""
        Write-Host "🔗 验证URL:" -ForegroundColor Cyan
        Write-Host "https://herbscience.shop/blog/pickled-onion-benefits" -ForegroundColor White
        Write-Host ""
        Write-Host "📌 下一步建议:" -ForegroundColor Cyan
        Write-Host "1. 在网站上验证文章显示" -ForegroundColor White
        Write-Host "2. 提交sitemap到Google Search Console" -ForegroundColor White
        Write-Host "3. 创建系列第2篇: Onion Health Benefits (KGR: 0.516)" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "❌ 部署失败" -ForegroundColor Red
        Write-Host "请查看 PICKLED_ONION_BLOG_DEPLOYMENT_GUIDE.md 获取故障排除帮助" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

