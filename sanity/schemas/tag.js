export default {
  name: 'tag',
  title: '🏷️ 标签',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '标签名称',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL别名',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: '描述',
      type: 'text',
      rows: 2
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description'
    }
  }
} 