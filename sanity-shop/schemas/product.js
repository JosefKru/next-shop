export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    // {
    //   title: 'Default variant',
    //   name: 'defaultProductVariant',
    //   type: 'productVariant',
    // },
    // {
    //   title: 'Tags',
    //   name: 'tags',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'string',
    //     },
    //   ],
    //   options: {
    //     layout: 'tags',
    //   },
    // },
    {
      name: 'vendor',
      title: 'Vendor',
      type: 'reference',
      to: { type: 'vendor' },
    },
    // {
    //   name: 'blurb',
    //   title: 'Blurb',
    //   type: 'localeString',
    // },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'category' },
        },
      ],
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      manufactor: 'manufactor.title',
      media: 'defaultProductVariant.images[0]',
    },
  },
}
