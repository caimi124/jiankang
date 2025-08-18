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
          .title('Content')
          .items([
            // 草药数据库
            S.listItem()
              .title('Herbs Database')
              .icon(() => '🌿')
              .child(
                S.documentTypeList('herb')
                  .title('Herbs Database')
                  .filter('_type == "herb"')
              ),
            
            // 博客文章
            S.listItem()
              .title('Blog Posts')
              .icon(() => '📝')
              .child(
                S.documentTypeList('blogPost')
                  .title('Blog Posts')
                  .filter('_type == "blogPost"')
              ),
            
            // 作者
            S.listItem()
              .title('Authors')
              .icon(() => '👨‍⚕️')
              .child(
                S.documentTypeList('author')
                  .title('Authors')
                  .filter('_type == "author"')
              ),
            
            // 分类
            S.listItem()
              .title('Categories')
              .icon(() => '🏷️')
              .child(
                S.documentTypeList('category')
                  .title('Categories')
                  .filter('_type == "category"')
              ),
            
            // 标签
            S.listItem()
              .title('Tags')
              .icon(() => '🔖')
              .child(
                S.documentTypeList('tag')
                  .title('Tags')
                  .filter('_type == "tag"')
              ),
            
            // 站点设置
            S.listItem()
              .title('Site Settings')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ])
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // 开发环境配置
  studio: {
    components: {
      logo: () => '🌿 HerbScience CMS'
    }
  }
}) 