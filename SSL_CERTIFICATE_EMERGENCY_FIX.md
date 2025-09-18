# 🚨 SSL证书过期紧急修复方案

## 📋 问题诊断

### 🔍 发现的问题
```
❌ 错误: certificate has expired (www.herbscience.shop)
✅ 正常: herbscience.shop (可正常访问)
```

**根本原因**: `www.herbscience.shop` 的SSL证书已过期，导致：
1. Google搜索爬虫无法访问www版本
2. 重定向循环，因为中间件试图将non-www重定向到过期的www域名
3. 用户无法正常访问网站的www版本

## ✅ 紧急修复方案

### 1. 立即修复策略：使用non-www作为主域名

由于`herbscience.shop`可正常访问，立即将其设为主域名：

#### A. 修改重定向逻辑 (middleware.ts)
```typescript
// 修改为：www -> non-www (避免SSL过期域名)
if (url.hostname === 'www.herbscience.shop') {
  url.hostname = 'herbscience.shop'
  needsRedirect = true
}
```

#### B. 修改next.config.js
```javascript
// 域名规范化：www -> non-www
{
  source: '/:path*',
  has: [{ type: 'host', value: 'www.herbscience.shop' }],
  destination: 'https://herbscience.shop/:path*',
  permanent: true,
}
```

#### C. 修改vercel.json
```json
{
  "source": "/(.*)",
  "has": [{"type": "host", "value": "www.herbscience.shop"}],
  "destination": "https://herbscience.shop/$1",
  "permanent": true
}
```

#### D. 更新sitemap配置
```javascript
// next-sitemap.config.js
siteUrl: 'https://herbscience.shop', // 移除www
```

#### E. 更新robots.txt
```
Sitemap: https://herbscience.shop/sitemap.xml
```

### 2. 长期解决方案：修复SSL证书

在Vercel控制台：
1. 进入项目设置 → Domains
2. 检查 `www.herbscience.shop` SSL状态
3. 如果证书过期，点击 "Renew Certificate"
4. 或者删除www域名重新添加

## 🎯 执行优先级

**立即执行（紧急）**：
- [ ] 修改重定向配置使用non-www
- [ ] 更新sitemap和robots.txt
- [ ] 重新部署网站

**后续执行（1-2天内）**：
- [ ] 联系Vercel支持或在控制台修复SSL
- [ ] 证书修复后恢复www为主域名
- [ ] 重新配置重定向为non-www -> www

## 🔧 测试验证

修复后应该：
✅ `https://herbscience.shop/*` - 200 正常访问
✅ `https://www.herbscience.shop/*` - 301/308 重定向到non-www
✅ Google搜索爬虫可正常访问所有页面
✅ 重定向错误消失

---

*修复时间预估: 15分钟配置修改 + 5分钟部署 = 20分钟立即生效*
