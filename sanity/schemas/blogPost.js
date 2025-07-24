export default {
  name: 'blogPost',
  title: '📝 博客文章',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '标题',
      type: 'string',
      validation: Rule => Rule.required().min(10).max(100)
    },
    {
      name: 'slug',
      title: 'URL别名',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: '摘要',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().min(50).max(200),
      description: '文章摘要，用于列表页和SEO，50-200字符'
    },
    {
      name: 'mainImage',
      title: '主图',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '替代文字',
          description: '图片的替代文字，用于SEO和无障碍访问',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'categories',
      title: '分类',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: Rule => Rule.required().min(1).max(3)
    },
    {
      name: 'tags',
      title: '标签',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      validation: Rule => Rule.max(5)
    },
    {
      name: 'author',
      title: '作者',
      type: 'reference',
      to: {type: 'author'},
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: '发布时间',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'updatedAt',
      title: '更新时间',
      type: 'datetime'
    },
    {
      name: 'body',
      title: '正文内容',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {title: '粗体', value: 'strong'},
              {title: '斜体', value: 'em'},
              {title: '下划线', value: 'underline'},
              {title: '删除线', value: 'strike-through'},
              {title: '代码', value: 'code'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: '链接',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              },
              {
                name: 'herbLink',
                type: 'object',
                title: '草药链接',
                fields: [
                  {
                    name: 'herb',
                    type: 'reference',
                    to: [{type: 'herb'}],
                    title: '草药'
                  }
                ]
              }
            ]
          },
          styles: [
            {title: '正文', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: '引用', value: 'blockquote'}
          ],
          lists: [{title: '项目符号', value: 'bullet'}, {title: '编号', value: 'number'}]
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: '替代文字'
            },
            {
              name: 'caption',
              type: 'string',
              title: '图片说明'
            }
          ]
        },
        {
          type: 'object',
          name: 'callout',
          title: '提示框',
          fields: [
            {
              name: 'type',
              type: 'string',
              title: '类型',
              options: {
                list: [
                  {title: '信息', value: 'info'},
                  {title: '警告', value: 'warning'},
                  {title: '危险', value: 'danger'},
                  {title: '成功', value: 'success'}
                ]
              }
            },
            {
              name: 'content',
              type: 'text',
              title: '内容'
            }
          ]
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'relatedHerbs',
      title: '相关草药',
      type: 'array',
      of: [{type: 'reference', to: {type: 'herb'}}],
      description: '文章中提到的主要草药'
    },
    {
      name: 'estimatedReadingTime',
      title: '预计阅读时间(分钟)',
      type: 'number',
      description: '自动计算，也可手动调整'
    },
    {
      name: 'seo',
      title: 'SEO设置',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta标题',
          description: '如果不填写，将使用文章标题',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta描述',
          description: '如果不填写，将使用文章摘要',
          validation: Rule => Rule.max(160)
        },
        {
          name: 'keywords',
          type: 'array',
          title: '关键词',
          of: [{type: 'string'}],
          options: {
            layout: 'tags'
          }
        },
        {
          name: 'noIndex',
          type: 'boolean',
          title: '不索引此页面',
          description: '勾选后搜索引擎将不会索引此页面'
        }
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt'
    },
    prepare(selection) {
      const {author, publishedAt} = selection
      return Object.assign({}, selection, {
        subtitle: author && publishedAt ? `${author} · ${new Date(publishedAt).toLocaleDateString('zh-CN')}` : ''
      })
    }
  },
  
  orderings: [
    {
      title: '发布时间，新到旧',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: '发布时间，旧到新',
      name: 'publishedAtAsc',
      by: [
        {field: 'publishedAt', direction: 'asc'}
      ]
    }
  ]
} 