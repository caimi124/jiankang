import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'herb',
  title: '草药',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '英文名称',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100)
    }),
    defineField({
      name: 'chineseName',
      title: '中文名称',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50)
    }),
    defineField({
      name: 'latinName',
      title: '拉丁学名',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(100)
    }),
    defineField({
      name: 'slug',
      title: 'URL标识',
      type: 'slug',
      options: {
        source: 'chineseName',
        maxLength: 96,
        slugify: (input: string) => 
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      title: '分类',
      type: 'string',
      options: {
        list: [
          '免疫支持', '消化健康', '肝脏健康', '呼吸系统', '镇静安神',
          '抗炎作用', '解毒支持', '补气养血', '止咳化痰', '能量提升',
          '情绪管理', '睡眠支持', '压力与焦虑', '女性健康', '男性健康'
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'constitutionType',
      title: '适用体质',
      type: 'string',
      options: {
        list: [
          '平和质', '气虚质', '阳虚质', '阴虚质', '痰湿质', 
          '湿热质', '血瘀质', '气郁质', '特禀质', '通用'
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'primaryEffects',
      title: '主要功效',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          '免疫支持', '消化健康', '肝脏健康', '呼吸系统', '镇静安神',
          '抗炎作用', '解毒支持', '补气养血', '止咳化痰', '能量提升',
          '情绪管理', '睡眠支持', '压力与焦虑', '女性健康', '男性健康'
        ]
      },
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: 'activeCompounds',
      title: '活性成分',
      type: 'array',
      of: [{ type: 'string' }],
      description: '主要化学成分，如黄酮类、生物碱等'
    }),
    defineField({
      name: 'dosage',
      title: '用法用量',
      type: 'text',
      description: '推荐用法和用量，包括煎煮方法'
    }),
    defineField({
      name: 'safetyLevel',
      title: '安全等级',
      type: 'string',
      options: {
        list: [
          { title: '高安全性', value: 'high' },
          { title: '中等安全性', value: 'medium' },
          { title: '谨慎使用', value: 'low' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'contraindications',
      title: '禁忌症',
      type: 'text',
      description: '不适用人群和情况'
    }),
    defineField({
      name: 'description',
      title: '描述',
      type: 'text',
      description: '草药的基本介绍和特点'
    }),
    defineField({
      name: 'traditionalUse',
      title: '传统用法',
      type: 'text',
      description: '中医传统理论中的用法和功效'
    }),
    defineField({
      name: 'modernApplications',
      title: '现代应用',
      type: 'text',
      description: '现代医学研究支持的应用'
    }),
    defineField({
      name: 'featuredImage',
      title: '主图',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '替代文本',
          description: '图片的详细描述，用于SEO和无障碍访问'
        }
      ]
    }),
    defineField({
      name: 'gallery',
      title: '图片库',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: '替代文本'
            },
            {
              name: 'caption',
              type: 'string',
              title: '图片说明'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO标题',
      type: 'string',
      description: '用于搜索引擎优化的标题，建议包含关键词'
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO描述',
      type: 'text',
      description: '用于搜索引擎优化的描述，建议150-160字符'
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO关键词',
      type: 'array',
      of: [{ type: 'string' }],
      description: '相关的搜索关键词'
    })
  ],
  preview: {
    select: {
      title: 'chineseName',
      subtitle: 'title',
      media: 'featuredImage'
    }
  }
})
