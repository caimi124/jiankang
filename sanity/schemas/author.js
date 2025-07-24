export default {
  name: 'author',
  title: '👥 作者',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '姓名',
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
      name: 'avatar',
      title: '头像',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'bio',
      title: '个人简介',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    },
    {
      name: 'credentials',
      title: '专业资质',
      type: 'array',
      of: [{type: 'string'}],
      description: '如：中医师、营养师、博士等'
    },
    {
      name: 'specialties',
      title: '专业领域',
      type: 'array',
      of: [{type: 'string'}],
      description: '如：草药学、营养学、传统中医等'
    },
    {
      name: 'socialLinks',
      title: '社交媒体',
      type: 'object',
      fields: [
        {
          name: 'website',
          type: 'url',
          title: '个人网站'
        },
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn'
        },
        {
          name: 'twitter',
          type: 'url',
          title: 'Twitter'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'avatar',
      subtitle: 'credentials.0'
    }
  }
} 