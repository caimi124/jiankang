
# 🔧 Google Search Console 完整设置指南

## 第一步：验证网站所有权

### 方法1：HTML标签验证（推荐）
1. 访问 https://search.google.com/search-console/
2. 点击"添加属性" → 选择"URL前缀"
3. 输入：https://www.herbscience.shop
4. 选择"HTML标签"验证方法
5. 复制提供的meta标签，类似：
   ```html
   <meta name="google-site-verification" content="ABC123..." />
   ```
6. 将标签添加到 app/layout.tsx 文件：
   ```javascript
   verification: {
     google: 'ABC123...',  // 只需要content值
   },
   ```
7. 重新部署网站
8. 返回Google Search Console点击"验证"

### 方法2：HTML文件验证
1. 下载Google提供的HTML文件
2. 上传到网站根目录 (public/ 文件夹)
3. 确保文件可通过 https://www.herbscience.shop/google123.html 访问

## 第二步：提交Sitemap

验证成功后：
1. 在左侧菜单选择"站点地图"
2. 输入sitemap URL：sitemap.xml
3. 点击"提交"
4. 等待Google处理（通常24-48小时）

## 第三步：请求编入索引

对于重要页面：
1. 使用"网址检查"工具
2. 输入具体页面URL
3. 点击"请求编入索引"
4. 对以下页面执行此操作：
   - https://www.herbscience.shop/
   - https://www.herbscience.shop/zh
   - https://www.herbscience.shop/herbs/ginseng
   - https://www.herbscience.shop/constitution-test

## 第四步：监控收录状态

定期检查：
- 覆盖率报告：查看已索引页面数量
- 效果报告：监控搜索流量
- URL检查：测试特定页面索引状态
