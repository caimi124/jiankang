import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'herbscience-cms',
  title: 'HerbScience CMS',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('内容管理')
          .items([
            // 博客文章
            S.listItem()
              .title('📝 博客文章')
              .child(
                S.documentTypeList('blogPost')
                  .title('博客文章')
                  .filter('_type == "blogPost"')
              ),
            
            // 分类管理
            S.listItem()
              .title('📂 分类')
              .child(
                S.documentTypeList('category')
                  .title('分类')
                  .filter('_type == "category"')
              ),
            
            // 标签管理
            S.listItem()
              .title('🏷️ 标签')
              .child(
                S.documentTypeList('tag')
                  .title('标签')
                  .filter('_type == "tag"')
              ),
            
            // 作者管理
            S.listItem()
              .title('👥 作者')
              .child(
                S.documentTypeList('author')
                  .title('作者')
                  .filter('_type == "author"')
              ),
            
            // 草药数据 (只读引用)
            S.listItem()
              .title('🌿 草药数据')
              .child(
                S.documentTypeList('herb')
                  .title('草药数据')
                  .filter('_type == "herb"')
              ),
          ])
    }),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // 自定义工具栏
  tools: (prev) => [
    ...prev,
    {
      name: 'preview',
      title: '预览网站',
      icon: () => '🌐',
      component: () => {
        window.open('https://www.herbscience.shop', '_blank')
        return null
      }
    }
  ]
}) 