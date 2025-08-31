# Git仓库历史清理脚本 - 清理Notion API Token
# 注意：此脚本会重写Git历史，请确保备份重要数据

param(
    [string]$RepoPath = "E:\jiangkang",
    [string]$Branch = "main",
    [string]$Remote = "origin"
)

Write-Host "🔍 Git仓库历史清理脚本 - 清理Notion API Token" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# 检查是否在正确的目录
if (-not (Test-Path "$RepoPath\.git")) {
    Write-Host "❌ 错误：在 $RepoPath 中未找到Git仓库" -ForegroundColor Red
    exit 1
}

# 切换到仓库目录
Set-Location $RepoPath
Write-Host "✅ 已切换到仓库目录: $RepoPath" -ForegroundColor Green

# 检查git-filter-repo是否安装
try {
    $filterRepoVersion = git filter-repo --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 错误：git-filter-repo 未安装" -ForegroundColor Red
        Write-Host "请先安装 git-filter-repo：" -ForegroundColor Yellow
        Write-Host "pip install git-filter-repo" -ForegroundColor Cyan
        Write-Host "或者访问: https://github.com/newren/git-filter-repo" -ForegroundColor Cyan
        exit 1
    }
    Write-Host "✅ git-filter-repo 已安装: $filterRepoVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ 错误：无法检查 git-filter-repo" -ForegroundColor Red
    exit 1
}

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

# 定义要清理的Token模式
$tokenPatterns = @(
    "sk5Qin9vh6rLwgcgZCoBa8RRbaNBXZbSZD5rn31wquTd993G7sFb7LbUeqe8P3jyb3BpmRhWhEe69UrnzZVwaIVmfMdAWrAYYBpfSs29YhMHVJWKjA49XpTQtgKd5lq7IjXPx6VmkgbfuT66Qk2JNapwup3KtSy8jNmCANRZsYzLKcfniWS6",
    "sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp"
)

Write-Host "`n🔍 开始清理Git历史中的Notion API Token..." -ForegroundColor Blue

# 创建临时文件来存储替换规则
$replaceFile = "token-replacements.txt"
$replaceFile | ForEach-Object {
    foreach ($token in $tokenPatterns) {
        "$token => [REDACTED]"
    }
} | Out-File -FilePath $replaceFile -Encoding UTF8

Write-Host "✅ 已创建替换规则文件: $replaceFile" -ForegroundColor Green

# 使用git-filter-repo清理历史
Write-Host "`n🧹 使用 git-filter-repo 清理历史..." -ForegroundColor Blue
Write-Host "这可能需要几分钟时间，请耐心等待..." -ForegroundColor Yellow

try {
    # 使用git-filter-repo替换所有Token
    foreach ($token in $tokenPatterns) {
        Write-Host "正在清理Token: $($token.Substring(0, 20))..." -ForegroundColor Cyan
        
        git filter-repo --replace-text $replaceFile --force
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ git-filter-repo 执行失败" -ForegroundColor Red
            throw "git-filter-repo failed"
        }
    }
    
    Write-Host "✅ Git历史清理完成！" -ForegroundColor Green
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
Remove-Item $replaceFile -ErrorAction SilentlyContinue

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
