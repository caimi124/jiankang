import { defineType, defineField } from 'sanity'

export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: () => '🔖',
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
      rows: 2
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
}) 