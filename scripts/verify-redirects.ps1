# 重定向验证脚本
# 用途：快速验证所有重定向规则是否正确工作
# 使用：.\scripts\verify-redirects.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   HerbScience 重定向验证工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$testCases = @(
    @{
        Name = "1. www → non-www"
        Url = "https://www.herbscience.shop/"
        ExpectedLocation = "https://herbscience.shop/"
        ExpectedStatus = "301"
    },
    @{
        Name = "2. HTTP → HTTPS"
        Url = "http://herbscience.shop/"
        ExpectedLocation = "https://herbscience.shop/"
        ExpectedStatus = "301"
    },
    @{
        Name = "3. index.html 清理"
        Url = "https://herbscience.shop/index.html"
        ExpectedLocation = "https://herbscience.shop/"
        ExpectedStatus = "301"
    },
    @{
        Name = "4. 旧 URL: herb-finder → herbs"
        Url = "https://herbscience.shop/herb-finder/rosae-caninae-fructus"
        ExpectedLocation = "https://herbscience.shop/herbs/rosae-caninae-fructus"
        ExpectedStatus = "301"
    },
    @{
        Name = "5. 旧 URL: herb-finder → herbs (turmeric)"
        Url = "https://herbscience.shop/herb-finder/turmeric"
        ExpectedLocation = "https://herbscience.shop/herbs/turmeric"
        ExpectedStatus = "301"
    },
    @{
        Name = "6. 草药规范化: cloves → clove"
        Url = "https://herbscience.shop/herbs/cloves"
        ExpectedLocation = "https://herbscience.shop/herbs/clove"
        ExpectedStatus = "301"
    },
    @{
        Name = "7. 测试路径: /quiz → /constitution-test"
        Url = "https://herbscience.shop/quiz"
        ExpectedLocation = "https://herbscience.shop/constitution-test"
        ExpectedStatus = "301"
    },
    @{
        Name = "8. 文章路径: /articles → /blog"
        Url = "https://herbscience.shop/articles"
        ExpectedLocation = "https://herbscience.shop/blog"
        ExpectedStatus = "301"
    },
    @{
        Name = "9. 复杂场景: www + HTTP + 旧格式"
        Url = "http://www.herbscience.shop/herb-finder/turmeric"
        ExpectedLocation = "https://herbscience.shop/herbs/turmeric"
        ExpectedStatus = "301"
    }
)

$passCount = 0
$failCount = 0

foreach ($test in $testCases) {
    Write-Host "测试: $($test.Name)" -ForegroundColor Yellow
    Write-Host "  URL: $($test.Url)" -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri $test.Url -MaximumRedirection 0 -ErrorAction SilentlyContinue
        $statusCode = $response.StatusCode
        $location = $response.Headers.Location
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.Value__
        $location = $_.Exception.Response.Headers.Location
    }
    
    $statusMatch = $statusCode -eq $test.ExpectedStatus
    $locationMatch = $location -like "*$($test.ExpectedLocation)*" -or $location -eq $test.ExpectedLocation
    
    if ($statusMatch -and $locationMatch) {
        Write-Host "  ✅ 通过" -ForegroundColor Green
        Write-Host "     状态码: $statusCode" -ForegroundColor Green
        Write-Host "     重定向到: $location" -ForegroundColor Green
        $passCount++
    }
    else {
        Write-Host "  ❌ 失败" -ForegroundColor Red
        Write-Host "     期望状态码: $($test.ExpectedStatus), 实际: $statusCode" -ForegroundColor Red
        Write-Host "     期望重定向: $($test.ExpectedLocation)" -ForegroundColor Red
        Write-Host "     实际重定向: $location" -ForegroundColor Red
        $failCount++
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "测试结果总结" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ 通过: $passCount" -ForegroundColor Green
Write-Host "❌ 失败: $failCount" -ForegroundColor Red
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "🎉 所有重定向测试通过！网站配置正确。" -ForegroundColor Green
}
else {
    Write-Host "⚠️  有 $failCount 个测试失败，请检查配置。" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "下一步操作：" -ForegroundColor Cyan
Write-Host "1. 如果所有测试通过，请访问 Google Search Console" -ForegroundColor White
Write-Host "2. 使用 URL 检查工具验证关键页面" -ForegroundColor White
Write-Host "3. 重新提交 Sitemap" -ForegroundColor White
Write-Host "4. 移除旧 URL 索引（Google Search Console → 移除）" -ForegroundColor White
Write-Host ""
