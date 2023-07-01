import Header from '../components/Header'
import Landing from './../components/Landing'
import Basket from '../components/Basket'
import Categories from '../components/Categories'
import MainLayout from './layouts/main'
import { fetchCategories } from '../utils/fetchCategories'
import { fetchProducts } from './../utils/fetchProducts'
import { getSession } from 'next-auth/react'

function Home({ categories, products }) {
  return (
    <MainLayout metaTitle='Room4mommy' categories={categories}>
      <Basket />

      <Header bg='bg- [#fbffaa] gradient-to-r from-[]' />

      <main className='relative pb-20 md:pb-10'>
        <Landing products={products} />
      </main>

      <section className=''>
        <Categories categories={categories} products={products} />
      </section>
    </MainLayout>
  )
}

export default Home

export const getServerSideProps = async (context) => {
  const categories = await fetchCategories()
  const products = await fetchProducts()
  const session = await getSession(context)

  return {
    props: { categories, products, session },
  }
}
