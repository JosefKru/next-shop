export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Meta-title',
      name: 'metaTitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    // {
    //   name: 'image',
    //   title: 'Image',
    //   type: 'array',
    //   of: [{ type: 'image', 
    //   options: {
    //     hotspot: true,
    //   },}]
    //  },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'vendor',
      title: 'Brand',
      type: 'reference',
      to: { type: 'vendor' },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
  ],
}
