import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'herbscience-blog',
  title: 'HerbScience Blog CMS',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  basePath: '/admin',
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Blog Posts
            S.listItem()
              .title('Blog Posts')
              .child(
                S.documentTypeList('blog')
                  .title('Blog Posts')
                  .filter('_type == "blog"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            
            // Categories
            S.listItem()
              .title('Categories')
              .child(
                S.documentTypeList('category')
                  .title('Categories')
              ),
              
            // Authors
            S.listItem()
              .title('Authors')
              .child(
                S.documentTypeList('author')
                  .title('Authors')
              ),
            
            // Divider
            S.divider(),
            
            // Published Posts
            S.listItem()
              .title('📝 Published Posts')
              .child(
                S.documentTypeList('blog')
                  .title('Published Posts')
                  .filter('_type == "blog" && status == "published"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
              
            // Draft Posts
            S.listItem()
              .title('✏️ Draft Posts')
              .child(
                S.documentTypeList('blog')
                  .title('Draft Posts')
                  .filter('_type == "blog" && status == "draft"')
                  .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
              ),
              
            // Featured Posts
            S.listItem()
              .title('⭐ Featured Posts')
              .child(
                S.documentTypeList('blog')
                  .title('Featured Posts')
                  .filter('_type == "blog" && featured == true')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
          ])
    }),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // 自定义编辑器配置
  document: {
    // 默认语言配置
    actions: (prev, context) => prev
  }
}) 