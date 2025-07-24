export default {
  name: 'category',
  title: '📂 分类',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '分类名称',
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
      rows: 3
    },
    {
      name: 'color',
      title: '颜色',
      type: 'string',
      options: {
        list: [
          {title: '绿色', value: 'green'},
          {title: '蓝色', value: 'blue'},
          {title: '紫色', value: 'purple'},
          {title: '红色', value: 'red'},
          {title: '橙色', value: 'orange'},
          {title: '黄色', value: 'yellow'}
        ]
      }
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description'
    }
  }
} 