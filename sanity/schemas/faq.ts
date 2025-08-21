import { defineType, defineField } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: r => r.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: r => r.required() }),
    defineField({ name: 'herb', title: 'Related Herb', type: 'reference', to: [{ type: 'herb' }] }),
    defineField({ name: 'language', title: 'Language', type: 'string', options: { list: ['en','zh'] }, initialValue: 'en' })
  ]
})


