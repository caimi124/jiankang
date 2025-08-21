import { defineType, defineField } from 'sanity'

export const study = defineType({
  name: 'study',
  title: 'Study',
  type: 'document',
  fields: [
    defineField({ name: 'herb', title: 'Herb', type: 'reference', to: [{ type: 'herb' }], validation: r => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4 }),
    defineField({ name: 'link', title: 'Link', type: 'url' }),
    defineField({ name: 'evidenceLevel', title: 'Evidence Level', type: 'string', options: { list: ['Strong','Moderate','Limited'] }, initialValue: 'Moderate' })
  ]
})


