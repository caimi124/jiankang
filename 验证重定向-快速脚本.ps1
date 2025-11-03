# SEO 修复验证脚本
# 等待部署完成后运行此脚本

Write-Host "`n🚀 SEO 修复验证脚本" -ForegroundColor Green
Write-Host "====================================`n" -ForegroundColor Green

# 检查 Vercel 部署状态
Write-Host "📊 步骤 1: 检查部署状态" -ForegroundColor Yellow
Write-Host "请访问: https://vercel.com/dashboard" -ForegroundColor Cyan
Write-Host "或者: https://github.com/caimi124/jiankang/actions`n" -ForegroundColor Cyan
Write-Host "⏳ 等待显示 ✅ 绿色对勾（约2-5分钟）...`n" -ForegroundColor White

Read-Host "按 Enter 继续验证重定向（确认部署完成后）"

Write-Host "`n🔍 步骤 2: 测试301重定向" -ForegroundColor Yellow
Write-Host "====================================`n" -ForegroundColor Yellow

$urls = @{
    "https://herbscience.shop/herbs/elderberry" = "herb-finder"
    "https://herbscience.shop/herbs/rosae-caninae-fructus" = "herb-finder"  
    "https://herbscience.shop/herbs/foeniculi-vulgaris-fructus" = "herb-finder"
    "https://herbscience.shop/herbs/matricariae-flos" = "chamomile"
    "https://herbscience.shop/herb-finder/matricariae-flos" = "chamomile"
}

$successCount = 0
$failCount = 0

foreach ($url in $urls.Keys) {
    $expected = $urls[$url]
    Write-Host "`n测试: " -NoNewline
    Write-Host $url -ForegroundColor Cyan
    
    try {
        $response = Invoke-WebRequest -Uri $url -MaximumRedirection 0 -ErrorAction Stop
        Write-Host "❌ 失败: 返回状态 $($response.StatusCode)" -ForegroundColor Red
        $failCount++
    } catch {
        if ($_.Exception.Response.StatusCode -eq 301) {
            $location = $_.Exception.Response.Headers["Location"]
            if ($location -match $expected) {
                Write-Host "✅ 成功: 301 重定向到 $location" -ForegroundColor Green
                $successCount++
            } else {
                Write-Host "⚠️  警告: 301 重定向但目标不匹配" -ForegroundColor Yellow
                Write-Host "   预期包含: $expected" -ForegroundColor Yellow
                Write-Host "   实际目标: $location" -ForegroundColor Yellow
                $failCount++
            }
        } else {
            Write-Host "❌ 失败: 状态码 $($_.Exception.Response.StatusCode)" -ForegroundColor Red
            $failCount++
        }
    }
}

Write-Host "`n====================================`n" -ForegroundColor Green
Write-Host "📊 验证结果汇总:" -ForegroundColor Green
Write-Host "✅ 成功: $successCount / 5" -ForegroundColor Green
Write-Host "❌ 失败: $failCount / 5" -ForegroundColor $(if ($failCount -eq 0) { "Green" } else { "Red" })

if ($successCount -eq 5) {
    Write-Host "`n🎉 完美！所有重定向都正常工作！" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  有 $failCount 个重定向需要检查" -ForegroundColor Yellow
}

Write-Host "`n====================================`n" -ForegroundColor Green
Write-Host "📝 下一步操作:" -ForegroundColor Yellow
Write-Host "1. 访问 Google Search Console: https://search.google.com/search-console/" -ForegroundColor Cyan
Write-Host "2. 在 Bing Webmaster Tools 重新提交 sitemap: https://www.bing.com/webmasters/" -ForegroundColor Cyan
Write-Host "3. 查看详细修复报告: ✅_SEO问题修复完成_2025-11-02.md`n" -ForegroundColor Cyan

Read-Host "按 Enter 退出"

