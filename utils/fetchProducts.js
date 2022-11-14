// export const fetchProducts = async () => {
//   const res = await fetch(`${process.env.PUBLIC_BASE_URL}/api/getProducts`)

//   const data = await res.json()
//   const products = data.categories

//   return products
// }

export const fetchProducts = async () => {
  const res = await fetch(`${process.env.PUBLIC_BASE_URL}/api/getProducts`)

  const data = await res.json()
  const products = data.products

  return products
}
