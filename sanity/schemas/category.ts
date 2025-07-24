import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    }),
    
    defineField({
      name: 'icon',
      title: 'Icon Emoji',
      type: 'string',
      description: 'Single emoji to represent this category'
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      icon: 'icon'
    },
    prepare(selection) {
      const { icon } = selection
      return {
        ...selection,
        media: () => icon || '🏷️'
      }
    }
  }
}) 