# 🌿 HerbScience.shop Notion数据库集成指南

## 📋 概述
本指南将帮助您将草药数据库成功同步到您的Notion工作区。我们已经准备好了完整的50种草药数据，只需要正确配置Notion集成即可。

## 🚀 第一步：Notion集成设置

### 1. 创建Notion集成
1. 访问 [Notion Integrations](https://www.notion.so/my-integrations)
2. 点击 **"New integration"**
3. 填写以下信息：
   - **Name**: `HerbScience Database Sync`
   - **Logo**: 可选
   - **Associated workspace**: 选择您的工作区
4. 点击 **"Submit"**
5. 复制生成的 **Internal Integration Token**（以 `secret_` 开头）

### 2. 创建数据库页面
1. 在您的Notion工作区中创建一个新页面
2. 页面标题：`草药科学数据库`
3. 添加一个数据库（Database）
4. 复制页面URL中的ID（32位字符串）

### 3. 共享权限设置
1. 在数据库页面点击右上角的 **"Share"**
2. 点击 **"Invite"**
3. 搜索并添加您刚创建的集成：`HerbScience Database Sync`
4. 授予 **"Edit"** 权限

## 🔧 第二步：更新脚本配置

创建一个新的配置文件 `notion-config.js`：

```javascript
const { Client } = require("@notionhq/client");

// 请将下面的值替换为您的实际值
const NOTION_CONFIG = {
  // 您的集成令牌（以 secret_ 开头）
  auth: "secret_YOUR_INTEGRATION_TOKEN_HERE",
  
  // 您的数据库页面ID（32位字符串）
  databaseId: "YOUR_DATABASE_PAGE_ID_HERE"
};

module.exports = NOTION_CONFIG;
```

## 🌿 第三步：执行数据同步

我们已经准备了以下草药数据同步脚本：

### 可用的同步脚本：
1. **`notion-sync-with-setup.js`** - 基础版本（3种示例草药）
2. **`complete-notion-sync.js`** - 完整版本（50种草药）

### 运行同步：
```bash
# 安装依赖
npm install @notionhq/client

# 测试基础同步
node notion-sync-with-setup.js

# 运行完整同步
node complete-notion-sync.js
```

## 📊 第四步：数据库结构

同步完成后，您的Notion数据库将包含以下字段：

| 字段名 | 类型 | 描述 |
|--------|------|------|
| 草药名称 | Title | 草药的英文名称 |
| 中文名 | Rich Text | 草药的中文名称 |
| 植物学名 | Rich Text | 拉丁学名 |
| 简要描述 | Rich Text | 功效简述 |
| 成分构成 | Rich Text | 主要活性成分 |
| 推荐剂量 | Rich Text | 建议用量 |
| 功效分类 | Multi-select | 分类标签 |
| 使用建议 | Rich Text | 服用方法 |
| 安全性等级 | Select | 高/中/低 |
| 注意事项 | Rich Text | 禁忌和注意事项 |
| 中医体质匹配 | Rich Text | 适宜体质 |
| 参考链接 | URL | 权威参考资料 |
| 创建时间 | Created Time | 自动生成 |
| 更新时间 | Last Edited Time | 自动更新 |

## 🎯 第五步：数据内容预览

同步的50种草药包括：

### 🔥 经典草药：
- **姜黄 (Turmeric)** - 抗炎、关节保健
- **人参 (Ginseng)** - 增强免疫、扶正固本
- **绿茶 (Green Tea)** - 代谢调节、抗氧化

### 🌿 欧洲草药：
- **陈皮 (Citrus peel)** - 利尿通淋、清热解毒
- **熊果叶 (Bear-berry Leaf)** - 泌尿系统保健
- **贯叶连翘 (St. John's Wort)** - 情绪调节、安神

### 📈 涵盖治疗领域：
- 泌尿系统疾病
- 糖尿病管理
- 抑郁症缓解
- 记忆力增强
- 免疫系统支持
- 心血管健康
- 消化系统调理
- 呼吸系统保健
- 肝脏健康维护
- 抗炎止痛

## 🔍 第六步：验证同步

同步完成后：

1. 检查Notion数据库中的条目数量
2. 验证数据完整性（所有字段都有内容）
3. 测试搜索和筛选功能
4. 确认参考链接可以正常访问

## 🛠 故障排除

### 常见错误：

**错误：`object_not_found`**
- 解决：确保集成已被添加到数据库页面
- 确认数据库ID格式正确（32位字符串）

**错误：`unauthorized`**
- 解决：检查集成令牌是否正确
- 确认令牌没有过期

**错误：`validation_error`**
- 解决：检查数据格式是否符合Notion要求
- 验证多选字段的选项设置

## 📞 支持

如果您在设置过程中遇到问题：

1. 检查Notion集成权限设置
2. 验证API令牌和数据库ID
3. 查看脚本运行日志中的具体错误信息
4. 确保网络连接稳定

## 🎉 完成！

设置完成后，您将拥有一个功能完整的Notion草药数据库，包含：

- ✅ 50种精选草药的详细信息
- ✅ 结构化的数据组织
- ✅ 强大的搜索和筛选功能
- ✅ 移动端访问支持
- ✅ 团队协作功能
- ✅ 数据导出功能

您可以在此基础上继续扩展数据库，添加更多草药信息，或者与您的HerbScience.shop网站进行集成。 