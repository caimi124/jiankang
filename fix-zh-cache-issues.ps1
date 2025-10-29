# 中文页面缓存问题修复脚本
# 用于清除Vercel缓存并重新部署

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   中文页面404问题 - 缓存清除工具" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# 检查Git状态
Write-Host "1. 检查Git状态..." -ForegroundColor Yellow
$gitStatus = git status --short
if ($gitStatus) {
    Write-Host "   发现未提交的更改:" -ForegroundColor Red
    Write-Host $gitStatus
    Write-Host ""
    $continue = Read-Host "   是否要继续? (y/n)"
    if ($continue -ne 'y') {
        Write-Host "操作已取消" -ForegroundColor Red
        exit
    }
}

# 创建空提交以触发重新部署
Write-Host ""
Write-Host "2. 创建空提交以触发Vercel重新部署..." -ForegroundColor Yellow
git commit --allow-empty -m "🔧 Fix: Clear Vercel cache for Chinese pages - Force redeploy"

if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ 提交成功" -ForegroundColor Green
} else {
    Write-Host "   ❌ 提交失败" -ForegroundColor Red
    exit 1
}

# 推送到远程仓库
Write-Host ""
Write-Host "3. 推送到GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ 推送成功" -ForegroundColor Green
} else {
    Write-Host "   ❌ 推送失败" -ForegroundColor Red
    Write-Host "   可能需要先运行: git pull origin main" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   部署已触发!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "接下来的步骤:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 等待2-3分钟让Vercel完成部署" -ForegroundColor White
Write-Host "   查看部署状态: https://vercel.com/" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 部署完成后,清除浏览器缓存:" -ForegroundColor White
Write-Host "   - Chrome: Ctrl+Shift+Delete" -ForegroundColor Gray
Write-Host "   - 选择'全部时间'" -ForegroundColor Gray
Write-Host "   - 清除'缓存的图片和文件'" -ForegroundColor Gray
Write-Host ""
Write-Host "3. 测试中文页面:" -ForegroundColor White
Write-Host "   https://herbscience.shop/zh/" -ForegroundColor Gray
Write-Host ""
Write-Host "4. 运行诊断工具确认:" -ForegroundColor White
Write-Host "   node check-zh-pages.js" -ForegroundColor Gray
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan

