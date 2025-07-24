export default {
  name: 'herb',
  title: '🌿 草药',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '中文名',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'englishName',
      title: '英文名',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'latinName',
      title: '拉丁学名',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'URL别名',
      type: 'slug',
      options: {
        source: 'englishName',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: '草药分类',
      type: 'string',
      options: {
        list: [
          {title: '补益类', value: 'tonic'},
          {title: '清热类', value: 'heat-clearing'},
          {title: '化痰类', value: 'phlegm-resolving'},
          {title: '活血类', value: 'blood-activating'},
          {title: '安神类', value: 'spirit-calming'},
          {title: '消食类', value: 'digestive'},
          {title: '利水类', value: 'diuretic'},
          {title: '解表类', value: 'exterior-releasing'},
          {title: '泻下类', value: 'purgative'},
          {title: '其他', value: 'other'}
        ]
      }
    },
    {
      name: 'properties',
      title: '性味',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: '温', value: 'warm'},
          {title: '热', value: 'hot'},
          {title: '凉', value: 'cool'},
          {title: '寒', value: 'cold'},
          {title: '平', value: 'neutral'},
          {title: '甘', value: 'sweet'},
          {title: '酸', value: 'sour'},
          {title: '苦', value: 'bitter'},
          {title: '辛', value: 'pungent'},
          {title: '咸', value: 'salty'}
        ]
      }
    },
    {
      name: 'meridians',
      title: '归经',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: '肺经', value: 'lung'},
          {title: '心经', value: 'heart'},
          {title: '肝经', value: 'liver'},
          {title: '脾经', value: 'spleen'},
          {title: '肾经', value: 'kidney'},
          {title: '胃经', value: 'stomach'},
          {title: '大肠经', value: 'large-intestine'},
          {title: '小肠经', value: 'small-intestine'},
          {title: '膀胱经', value: 'bladder'},
          {title: '胆经', value: 'gallbladder'},
          {title: '三焦经', value: 'triple-energizer'},
          {title: '心包经', value: 'pericardium'}
        ]
      }
    },
    {
      name: 'description',
      title: '简介',
      type: 'text',
      rows: 3
    },
    {
      name: 'isActive',
      title: '在网站中激活',
      type: 'boolean',
      description: '是否在主网站中显示此草药',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'englishName',
      description: 'latinName'
    },
    prepare(selection) {
      const {title, subtitle, description} = selection
      return {
        title: `${title} (${subtitle})`,
        subtitle: description
      }
    }
  }
} 