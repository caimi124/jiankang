import { defineType, defineField } from 'sanity'

export const herb = defineType({
  name: 'herb',
  title: 'Herb',
  type: 'document',
  icon: () => '🌿',
  fields: [
    defineField({
      name: 'title',
      title: 'English Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'chineseName',
      title: 'Chinese Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'latinName',
      title: 'Latin Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    }),
    
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '补气药', value: 'qi-tonifying' },
          { title: '补血药', value: 'blood-tonifying' },
          { title: '补阳药', value: 'yang-tonifying' },
          { title: '补阴药', value: 'yin-tonifying' },
          { title: '活血化瘀药', value: 'blood-activating' },
          { title: '理气药', value: 'qi-regulating' },
          { title: '清热药', value: 'heat-clearing' },
          { title: '祛湿药', value: 'dampness-resolving' },
          { title: '消化药', value: 'digestive' },
          { title: '安神药', value: 'sedative' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'constitutionType',
      title: 'Constitution Type',
      type: 'string',
      options: {
        list: [
          { title: '平和体质', value: 'balanced' },
          { title: '气虚体质', value: 'qi-deficiency' },
          { title: '血虚体质', value: 'blood-deficiency' },
          { title: '阳虚体质', value: 'yang-deficiency' },
          { title: '阴虚体质', value: 'yin-deficiency' },
          { title: '痰湿体质', value: 'phlegm-dampness' },
          { title: '湿热体质', value: 'damp-heat' },
          { title: '血瘀体质', value: 'blood-stasis' },
          { title: '气郁体质', value: 'qi-stagnation' },
          { title: '特禀体质', value: 'special-constitution' }
        ]
      }
    }),
    
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'traditionalUse',
      title: 'Traditional Use',
      type: 'text',
      rows: 3
    }),
    
    defineField({
      name: 'modernApplications',
      title: 'Modern Applications',
      type: 'text',
      rows: 3
    }),
    
    defineField({
      name: 'primaryEffects',
      title: 'Primary Effects',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    
    defineField({
      name: 'secondaryEffects',
      title: 'Secondary Effects',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    
    defineField({
      name: 'efficacy',
      title: 'Efficacy',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    
    defineField({
      name: 'dosage',
      title: 'Dosage',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'safetyLevel',
      title: 'Safety Level',
      type: 'string',
      options: {
        list: [
          { title: 'High', value: 'high' },
          { title: 'Medium', value: 'medium' },
          { title: 'Low', value: 'low' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'contraindications',
      title: 'Contraindications',
      type: 'text',
      rows: 2
    }),
    
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string'
    }),
    
    defineField({
      name: 'activeCompounds',
      title: 'Active Compounds',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    
    defineField({
      name: 'interactionWarnings',
      title: 'Interaction Warnings',
      type: 'text',
      rows: 2
    }),
    
    defineField({
      name: 'storageInstructions',
      title: 'Storage Instructions',
      type: 'string'
    }),
    
    defineField({
      name: 'preparationMethods',
      title: 'Preparation Methods',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    
    defineField({
      name: 'qualityIndicators',
      title: 'Quality Indicators',
      type: 'string'
    }),
    
    defineField({
      name: 'seasonalAvailability',
      title: 'Seasonal Availability',
      type: 'string'
    }),
    
    defineField({
      name: 'geographicDistribution',
      title: 'Geographic Distribution',
      type: 'string'
    }),
    
    defineField({
      name: 'cultivationNotes',
      title: 'Cultivation Notes',
      type: 'text',
      rows: 2
    }),
    
    defineField({
      name: 'harvestProcessing',
      title: 'Harvest & Processing',
      type: 'text',
      rows: 2
    }),
    
    // SEO字段
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override the title for search engines',
      validation: Rule => Rule.max(60)
    }),
    
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines',
      validation: Rule => Rule.max(160)
    }),
    
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'draft'
    }),
    
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'chineseName',
      media: 'featuredImage'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle ? `${subtitle}` : 'No Chinese name'
      }
    }
  }
})
