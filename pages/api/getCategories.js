import { client } from '../../lib/client'

const query = `*[_type == "category"]`

export default async function handler(req, res) {
  const categories = await client.fetch(query)
  res.status(200).json({ categories })
}
