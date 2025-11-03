# 检查HerbScience.shop部署状态
Write-Host "`n🚀 开始检查部署状态..." -ForegroundColor Green
Write-Host "====================================`n" -ForegroundColor Green

# 检查网站是否可访问
Write-Host "📡 正在检查网站状态..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "https://herbscience.shop" -TimeoutSec 10 -UseBasicParsing
    
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ 网站可访问！状态码: 200" -ForegroundColor Green
        
        # 检查是否包含新组件的内容
        $content = $response.Content
        
        if ($content -match "精选中草药百科" -or $content -match "Featured Herbs") {
            Write-Host "✅ 精选草药组件已部署！" -ForegroundColor Green
        } else {
            Write-Host "⏳ 精选草药组件还未显示（可能正在部署中）" -ForegroundColor Yellow
        }
        
        if ($content -match "最新博客文章" -or $content -match "Latest Blogs") {
            Write-Host "✅ 最新博客组件已部署！" -ForegroundColor Green
        } else {
            Write-Host "⏳ 最新博客组件还未显示（可能正在部署中）" -ForegroundColor Yellow
        }
        
        Write-Host "`n🎉 部署检查完成！" -ForegroundColor Green
        
    } else {
        Write-Host "⚠️  网站返回状态码: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ 无法访问网站: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 可能原因：部署还在进行中，请等待2-3分钟后重试" -ForegroundColor Yellow
}

Write-Host "`n====================================`n" -ForegroundColor Green
Write-Host "📝 下一步操作：" -ForegroundColor Yellow
Write-Host "1. 如果部署完成 → 继续导入书签" -ForegroundColor Cyan
Write-Host "2. 如果还在部署 → 等待2分钟后重新运行此脚本" -ForegroundColor Cyan
Write-Host "`n💡 快速访问：" -ForegroundColor Yellow
Write-Host "Vercel: https://vercel.com/dashboard" -ForegroundColor Cyan
Write-Host "GitHub: https://github.com/caimi124/jiankang/actions" -ForegroundColor Cyan

Read-Host "`n按 Enter 退出"

