
# 🔍 Google Search Console 设置指南

## 1. 添加网站属性
1. 访问 https://search.google.com/search-console/
2. 点击 "添加属性"
3. 选择 "URL前缀" 
4. 输入: https://www.herbscience.shop

## 2. 验证网站所有权
推荐使用以下验证方法：

### 方法1: HTML标签验证（推荐）
1. 在Search Console中选择 "HTML标签" 验证方法
2. 复制提供的meta标签
3. 将标签添加到 app/layout.tsx 的 <head> 部分：
   ```
   <meta name="google-site-verification" content="您的验证码" />
   ```

### 方法2: Google Analytics验证
如果您已使用Google Analytics：
1. 确保使用相同的Google账户
2. 选择 "Google Analytics" 验证方法
3. 自动验证完成

## 3. 提交Sitemap
验证成功后：
1. 在左侧菜单选择 "站点地图"
2. 添加新的站点地图: sitemap.xml
3. 点击 "提交"

## 4. 监控索引状态
- 覆盖率报告: 检查已索引/未索引页面
- URL检查工具: 测试特定URL的索引状态
- 效果报告: 查看搜索表现数据

## 当前网站SEO状态
✅ Sitemap: 正常
✅ Robots.txt: 正常
✅ 页面可访问性: 9/9 正常

## 建议的优化步骤
- 网站基础SEO配置良好，可以提交到Google Search Console
- 所有关键页面都可正常访问
