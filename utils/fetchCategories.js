export const fetchCategories = async () => {
  const res = await fetch(`${process.env.PUBLIC_BASE_URL}/api/getCategories`)

  const data = await res.json()
  const categories = data.categories

  return categories
}
