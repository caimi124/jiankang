# 简化版Git仓库历史清理脚本 - 清理Notion API Token
# 使用git filter-branch（注意：git filter-repo更推荐，但需要额外安装）

param(
    [string]$RepoPath = "E:\jiangkang",
    [string]$Branch = "main",
    [string]$Remote = "origin"
)

Write-Host "🔍 简化版Git仓库历史清理脚本" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# 检查是否在正确的目录
if (-not (Test-Path "$RepoPath\.git")) {
    Write-Host "❌ 错误：在 $RepoPath 中未找到Git仓库" -ForegroundColor Red
    exit 1
}

# 切换到仓库目录
Set-Location $RepoPath
Write-Host "✅ 已切换到仓库目录: $RepoPath" -ForegroundColor Green

# 显示当前状态
Write-Host "`n📊 当前Git状态:" -ForegroundColor Blue
git status --porcelain

# 检查是否有未提交的更改
$uncommitted = git status --porcelain
if ($uncommitted) {
    Write-Host "`n⚠️  警告：发现未提交的更改" -ForegroundColor Yellow
    Write-Host "建议先提交或暂存更改，然后继续" -ForegroundColor Yellow
    
    $response = Read-Host "是否继续？(y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "操作已取消" -ForegroundColor Red
        exit 0
    }
}

# 备份当前分支
$backupBranch = "backup-before-token-cleanup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Write-Host "`n🔒 创建备份分支: $backupBranch" -ForegroundColor Blue
git checkout -b $backupBranch
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 创建备份分支失败" -ForegroundColor Red
    exit 1
}

# 切换回主分支
git checkout $Branch
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 切换回主分支失败" -ForegroundColor Red
    exit 1
}

Write-Host "✅ 已创建备份分支: $backupBranch" -ForegroundColor Green

# 定义要清理的Token
$notionTokens = @(
    "sk5Qin9vh6rLwgcgZCoBa8RRbaNBXZbSZD5rn31wquTd993G7sFb7LbUeqe8P3jyb3BpmRhWhEe69UrnzZVwaIVmfMdAWrAYYBpfSs29YhMHVJWKjA49XpTQtgKd5lq7IjXPx6VmkgbfuT66Qk2JNapwup3KtSy8jNmCANRZsYzLKcfniWS6",
    "sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp"
)

Write-Host "`n🔍 开始清理Git历史中的Notion API Token..." -ForegroundColor Blue

# 使用git filter-branch清理历史
Write-Host "`n🧹 使用 git filter-branch 清理历史..." -ForegroundColor Blue
Write-Host "这可能需要几分钟时间，请耐心等待..." -ForegroundColor Yellow

try {
    # 创建临时脚本来替换Token
    $filterScript = @"
#!/bin/bash
# 替换Notion API Token为[REDACTED]
sed -i 's/sk5Qin9vh6rLwgcgZCoBa8RRbaNBXZbSZD5rn31wquTd993G7sFb7LbUeqe8P3jyb3BpmRhWhEe69UrnzZVwaIVmfMdAWrAYYBpfSs29YhMHVJWKjA49XpTQtgKd5lq7IjXPx6VmkgbfuT66Qk2JNapwup3KtSy8jNmCANRZsYzLKcfniWS6/[REDACTED]/g'
sed -i 's/sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp/[REDACTED]/g'
"@

    $filterScript | Out-File -FilePath "filter-script.sh" -Encoding UTF8
    Write-Host "✅ 已创建过滤脚本" -ForegroundColor Green

    # 执行git filter-branch
    Write-Host "正在执行git filter-branch..." -ForegroundColor Cyan
    git filter-branch --tree-filter "bash filter-script.sh" --prune-empty --tag-name-filter cat -- --all
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Git历史清理完成！" -ForegroundColor Green
    } else {
        Write-Host "❌ git filter-branch 执行失败" -ForegroundColor Red
        throw "git filter-branch failed"
    }
    
} catch {
    Write-Host "❌ 清理过程中发生错误: $_" -ForegroundColor Red
    Write-Host "正在恢复备份..." -ForegroundColor Yellow
    
    # 恢复备份
    git checkout $backupBranch
    git branch -D $Branch
    git checkout -b $Branch
    git checkout $backupBranch
    
    Write-Host "✅ 已恢复到备份分支: $backupBranch" -ForegroundColor Green
    exit 1
}

# 清理临时文件
Remove-Item "filter-script.sh" -ErrorAction SilentlyContinue

# 清理备份引用
Write-Host "`n🧹 清理备份引用..." -ForegroundColor Blue
git for-each-ref --format="%(refname)" refs/original/ | ForEach-Object { git update-ref -d $_ }

# 清理reflog
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 显示清理结果
Write-Host "`n📊 清理结果:" -ForegroundColor Blue
git log --oneline -10

# 强制推送到远程仓库
Write-Host "`n🚀 准备强制推送到远程仓库..." -ForegroundColor Blue
Write-Host "⚠️  警告：这将重写远程仓库历史！" -ForegroundColor Red
Write-Host "如果其他人也在使用这个仓库，他们需要重新clone" -ForegroundColor Yellow

$response = Read-Host "是否继续强制推送？(y/N)"
if ($response -eq "y" -or $response -eq "Y") {
    Write-Host "正在强制推送..." -ForegroundColor Blue
    
    git push --force-with-lease $Remote $Branch
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ 强制推送成功！" -ForegroundColor Green
    } else {
        Write-Host "❌ 强制推送失败，可能需要先拉取最新更改" -ForegroundColor Red
        Write-Host "尝试: git pull --rebase $Remote $Branch" -ForegroundColor Yellow
    }
} else {
    Write-Host "推送已取消" -ForegroundColor Yellow
}

# 显示最终状态
Write-Host "`n🎉 清理完成！" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
Write-Host "✅ 备份分支: $backupBranch" -ForegroundColor Green
Write-Host "✅ 主分支: $Branch" -ForegroundColor Green
Write-Host "✅ 远程仓库: $Remote" -ForegroundColor Green
Write-Host "`n📝 重要提醒:" -ForegroundColor Yellow
Write-Host "1. 所有Notion API Token已被替换为 [REDACTED]" -ForegroundColor Cyan
Write-Host "2. Git历史已被重写" -ForegroundColor Cyan
Write-Host "3. 其他协作者需要重新clone仓库" -ForegroundColor Cyan
Write-Host "4. 备份分支已保存: $backupBranch" -ForegroundColor Cyan

Write-Host "`n🔒 安全建议:" -ForegroundColor Blue
Write-Host "- 立即轮换Notion API Token" -ForegroundColor Cyan
Write-Host "- 检查其他可能泄露的敏感信息" -ForegroundColor Cyan
Write-Host "- 考虑使用环境变量存储敏感信息" -ForegroundColor Cyan
