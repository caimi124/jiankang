import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3
    }),
    
    defineField({
      name: 'keywords',
      title: 'Default Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: {
        accept: '.ico,.png'
      }
    }),
    
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'twitter', type: 'url', title: 'Twitter' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
      ]
    }),
    
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        { name: 'googleAnalytics', type: 'string', title: 'Google Analytics ID' },
        { name: 'googleTagManager', type: 'string', title: 'Google Tag Manager ID' },
      ]
    })
  ],
  
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      }
    }
  }
}) 