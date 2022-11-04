import { client } from '../../lib/client'

const query = `*[_type == "product"]`

export default async function handler(req, res) {
  const products = await client.fetch(query)
  res.status(200).json({ products })
}
