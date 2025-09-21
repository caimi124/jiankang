# 更新.env.local文件的PowerShell脚本
$envContent = @"
# Sanity Configuration for HerbScience.shop
# 用户提供的正确配置 - 2025年1月19日更新

# Sanity项目配置
NEXT_PUBLIC_SANITY_PROJECT_ID=13rzzwgz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Sanity编辑器权限Token
SANITY_API_TOKEN=sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp

# Google Analytics (可选)
NEXT_PUBLIC_GA_ID=

# 其他配置
NODE_ENV=development
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8
Write-Host "✅ .env.local 文件已更新为正确的Sanity配置"
Write-Host "🔑 项目ID: 13rzzwgz"
Write-Host "🔐 Token: sk7J8ol...(已配置)"
