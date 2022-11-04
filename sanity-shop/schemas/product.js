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
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      // of: [{ type: 'image' }],
      // options: {
      //   hotspot: true,
      // },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
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
    },
    {
      title: 'Description',
      name: 'description',
      type: 'blockContent',
    },
  ],
}
