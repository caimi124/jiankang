import { defineType, defineField } from 'sanity'

export const dosage = defineType({
  name: 'dosage',
  title: 'Dosage',
  type: 'document',
  fields: [
    defineField({ name: 'herb', title: 'Herb', type: 'reference', to: [{ type: 'herb' }], validation: r => r.required() }),
    defineField({ name: 'form', title: 'Form', type: 'string', options: { list: ['extract','tea','powder','capsule','tincture'] } }),
    defineField({ name: 'dosage', title: 'Dosage', type: 'string' }),
    defineField({ name: 'usage', title: 'Usage Instructions', type: 'text', rows: 3 }),
    defineField({ name: 'notes', title: 'Notes', type: 'text', rows: 2 })
  ]
})


