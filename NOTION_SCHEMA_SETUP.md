## Notion 草药体系搭建指南（四库结构）

环境变量：
- NOTION_TOKEN=你的集成密钥
- NOTION_PARENT_PAGE_ID=作为父页面的 Notion 页面 ID

一键创建数据库：
```bash
node scripts/create-notion-schema.js
```
输出的四个库 ID 复制到 `.env.local`：
- NOTION_HERBS_DB_ID=
- NOTION_DOSAGES_DB_ID=
- NOTION_STUDIES_DB_ID=
- NOTION_FAQS_DB_ID=

为 Cinnamon 生成示例条目：
```bash
node scripts/seed-cinnamon.js
```

API 自动读取 Notion：
- `lib/notion-herbs.ts` 读取四库并映射到前端 `herbData` 字段
- `app/api/herbs/[slug]/route.ts` 优先读取 Notion，未命中回退内置库

字段建议详见产品方案（主库 Herbs 必填属性）：
- Herb Name（title）、LatinName（rich_text）、Slug（rich_text）
- Category（select）、Overview（rich_text）
- ActiveCompounds/Benefits/RecommendedFor/NotRecommendedFor/Tags（multi_select）
- InteractsWithDrugs（multi_select）、SafetyRating/ Pregnancy/ Lactation（select）
- Contraindications（multi_select）、Publish（checkbox）、LastReviewed（date）、MedicalReviewer（people）

子库：
- Dosages：Herb（relation）、Form（select）/FormText、TypicalDose、Frequency、Duration、Standardization、Notes
- Studies：Herb（relation）、Title、Year、StudyType、Outcomes、EffectDirection、RiskOfBias、Link、Takeaway、EvidenceWeight
- FAQs：Herb（relation）、Question、Answer

CSV 模板（示例头部）：
```csv
Herb Name,LatinName,Slug,Category,Overview,ActiveCompounds,Benefits,RecommendedFor,NotRecommendedFor,InteractsWithDrugs,SafetyRating,Contraindications,Pregnancy,Lactation,Tags,Publish
```

注意事项：
- 建议 `Slug` 与站点 URL 一致（全小写连字符）
- 枚举值统一英文化，便于欧美用户与搜索一致性
- 长期服用类风险项写入 Contraindications 与 SafetyRating，避免前端文案缺失


