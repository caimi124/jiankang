# Onion系列博客自动配置和部署脚本
# 使用方法: .\setup-env-and-deploy-onion-series.ps1

Write-Host "🧅 Onion系列博客 - 自动配置和部署" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 步骤1: 创建.env.local文件
Write-Host "📝 步骤1: 配置环境变量..." -ForegroundColor Yellow

$envContent = @"
# Sanity CMS 配置
NEXT_PUBLIC_SANITY_PROJECT_ID=13rzzwgz
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API Token (编辑权限)
SANITY_API_TOKEN=sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp

# Next.js 配置
NEXT_PUBLIC_SITE_URL=https://herbscience.shop

# 组织 ID
SANITY_ORGANIZATION_ID=ou4t3rSBT
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8 -Force
Write-Host "✅ .env.local 文件已创建" -ForegroundColor Green
Write-Host ""

# 步骤2: 部署第1篇 - Pickled Onion Benefits
Write-Host "🚀 步骤2: 部署第1篇 - Pickled Onion Benefits..." -ForegroundColor Yellow
node add-pickled-onion-blog-to-sanity.js

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 第1篇文章部署成功!" -ForegroundColor Green
} else {
    Write-Host "❌ 第1篇文章部署失败" -ForegroundColor Red
}
Write-Host ""

# 步骤3: 部署第2篇 - Onion for Cholesterol
Write-Host "🚀 步骤3: 部署第2篇 - Onion for Cholesterol & Heart Health..." -ForegroundColor Yellow
node add-onion-cholesterol-blog-to-sanity.js

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 第2篇文章部署成功!" -ForegroundColor Green
} else {
    Write-Host "❌ 第2篇文章部署失败" -ForegroundColor Red
}
Write-Host ""

# 步骤4: 部署第3篇 - Onion for Digestion
Write-Host "🚀 步骤4: 部署第3篇 - Onion for Digestion and Bloating..." -ForegroundColor Yellow
node add-onion-digestion-blog-to-sanity.js

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 第3篇文章部署成功!" -ForegroundColor Green
} else {
    Write-Host "❌ 第3篇文章部署失败" -ForegroundColor Red
}
Write-Host ""

# 总结
Write-Host "🎉 Onion系列博客部署完成!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 已部署的文章:" -ForegroundColor Cyan
Write-Host "1. Pickled Onion Benefits (KGR: 0.69)" -ForegroundColor White
Write-Host "2. Onion for Cholesterol & Heart Health (KGR: 1.46)" -ForegroundColor White
Write-Host "3. Onion for Digestion and Bloating (KGR: 2.7)" -ForegroundColor White
Write-Host ""
Write-Host "🔗 验证URL:" -ForegroundColor Cyan
Write-Host "https://herbscience.shop/blog/pickled-onion-benefits" -ForegroundColor White
Write-Host "https://herbscience.shop/blog/onion-for-cholesterol-heart-health" -ForegroundColor White
Write-Host "https://herbscience.shop/blog/onion-for-digestion-bloating" -ForegroundColor White
Write-Host ""
Write-Host "📌 下一步:" -ForegroundColor Cyan
Write-Host "1. 在网站验证文章显示" -ForegroundColor White
Write-Host "2. 提交sitemap到Google Search Console" -ForegroundColor White
Write-Host "3. 创建第4篇: Onion Health Benefits (主力流量文章)" -ForegroundColor White
Write-Host ""
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

