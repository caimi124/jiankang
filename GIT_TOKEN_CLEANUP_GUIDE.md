# 🔒 Git仓库Token清理指南

## 📋 问题描述

您的Git仓库中包含了Notion API Token，这些敏感信息不应该出现在代码中，需要从Git历史中完全清理。

## ⚠️ 重要提醒

### 3️⃣ 重点提醒
1. **先安装 git-filter-repo**，否则清理历史命令会报错
2. **清理历史后会重写 Git 历史**，如果其他人也在用这个仓库，他们需要重新 clone
3. **确保替换的 secret 完全正确**，否则 GitHub push protection 仍会拦截

## 🛠️ 解决方案

### 方案1：使用 git-filter-repo（推荐）

#### 步骤1：安装 git-filter-repo
```bash
# 使用pip安装
pip install git-filter-repo

# 或者下载可执行文件
# 访问: https://github.com/newren/git-filter-repo
```

#### 步骤2：运行清理脚本
```powershell
# 在PowerShell中运行
.\clean-git-history.ps1
```

### 方案2：使用 git filter-branch（内置工具）

#### 步骤1：运行简化版脚本
```powershell
# 在PowerShell中运行
.\clean-git-history-simple.ps1
```

### 方案3：使用Windows PowerShell原生功能

#### 步骤1：运行Windows专用脚本
```powershell
# 在PowerShell中运行
.\clean-git-history-windows.ps1
```

## 📁 脚本文件说明

### 1. `clean-git-history.ps1` - 完整版脚本
- 使用 git-filter-repo（需要安装）
- 功能最完整，性能最好
- 支持复杂的替换规则

### 2. `clean-git-history-simple.ps1` - 简化版脚本
- 使用 git filter-branch（Git内置）
- 无需额外安装
- 功能相对简单

### 3. `clean-git-history-windows.ps1` - Windows专用脚本
- 使用PowerShell原生功能
- 双重保障：git filter-branch + 手动替换
- 最适合Windows环境

## 🔍 清理的Token

脚本会自动清理以下Notion API Token：

1. **只读权限Token**:
   ```
   sk5Qin9vh6rLwgcgZCoBa8RRbaNBXZbSZD5rn31wquTd993G7sFb7LbUeqe8P3jyb3BpmRhWhEe69UrnzZVwaIVmfMdAWrAYYBpfSs29YhMHVJWKjA49XpTQtgKd5lq7IjXPx6VmkgbfuT66Qk2JNapwup3KtSy8jNmCANRZsYzLKcfniWS6
   ```

2. **编辑权限Token**:
   ```
   sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp
   ```

## 🚀 执行步骤

### 1. 准备工作
```powershell
# 确保在正确的目录
cd E:\jiangkang

# 检查Git状态
git status

# 确保没有未提交的更改
git add .
git commit -m "Save current changes before token cleanup"
```

### 2. 运行清理脚本
```powershell
# 选择其中一个脚本运行
.\clean-git-history-windows.ps1
```

### 3. 验证清理结果
```powershell
# 检查是否还有Token
git grep "sk5Qin9vh6rLwgcgZCoBa8RRbaNBXZbSZD5rn31wquTd993G7sFb7LbUeqe8P3jyb3BpmRhWhEe69UrnzZVwaIVmfMdAWrAYYBpfSs29YhMHVJWKjA49XpTQtgKd5lq7IjXPx6VmkgbfuT66Qk2JNapwup3KtSy8jNmCANRZsYzLKcfniWS6"

git grep "sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp"
```

### 4. 强制推送
```powershell
# 强制推送到远程仓库
git push --force-with-lease origin main
```

## 🔒 安全建议

### 立即行动
1. **轮换Notion API Token** - 生成新的Token
2. **检查其他敏感信息** - 搜索其他可能的密钥
3. **使用环境变量** - 将敏感信息移到环境变量中

### 长期措施
1. **Git Hooks** - 设置pre-commit钩子检查敏感信息
2. **代码扫描** - 使用工具自动检测密钥泄露
3. **权限管理** - 限制对敏感文件的访问

## 📊 预期结果

### 清理完成后
- ✅ 所有Notion API Token被替换为 `[REDACTED]`
- ✅ Git历史被重写，敏感信息完全移除
- ✅ 备份分支保存了原始状态
- ✅ 可以安全推送到GitHub

### 注意事项
- ⚠️ 其他协作者需要重新clone仓库
- ⚠️ 所有分支和标签都会被重写
- ⚠️ 需要重新设置远程仓库

## 🆘 故障排除

### 常见问题

#### 1. git-filter-repo未安装
```bash
pip install git-filter-repo
```

#### 2. 权限不足
```powershell
# 以管理员身份运行PowerShell
Start-Process powershell -Verb RunAs
```

#### 3. 清理失败
```powershell
# 恢复到备份分支
git checkout backup-before-token-cleanup-[timestamp]
```

#### 4. 推送失败
```powershell
# 先拉取最新更改
git pull --rebase origin main
# 然后强制推送
git push --force-with-lease origin main
```

## 📞 技术支持

如果遇到问题，请检查：

1. **Git版本** - 确保使用最新版本
2. **PowerShell版本** - 确保使用PowerShell 5.1或更高版本
3. **权限设置** - 确保有足够的文件系统权限
4. **网络连接** - 确保可以访问GitHub

## 🎯 总结

使用提供的PowerShell脚本，您可以：

1. **安全清理** Git历史中的敏感信息
2. **自动备份** 原始状态
3. **验证结果** 确保清理完全
4. **强制推送** 更新远程仓库

**重要提醒**：清理完成后，请立即轮换Notion API Token，并通知其他协作者重新clone仓库。
