import { defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (rule) => rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Purple', value: 'purple' },
          { title: 'Red', value: 'red' },
          { title: 'Orange', value: 'orange' },
          { title: 'Yellow', value: 'yellow' }
        ]
      },
      initialValue: 'blue'
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., "leaf", "heart", "brain")'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
}) 