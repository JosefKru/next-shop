import { client } from '../../lib/client'

export default async function handler(req, res) {
  const query = `*[_type == "product" ] {
    _id,
    _ref,
    category,
    description,
    image,
    price,
    slug,
    title,
    vendor,
  } | order(_createdAt asc)`

  const products = await client.fetch(query)
  res.status(200).json({ categories: products })
}
