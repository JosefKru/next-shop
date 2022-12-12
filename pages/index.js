import Head from 'next/head'
import Header from '../components/Header'
import Landing from './../components/Landing'
import Basket from '../components/Basket'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import { fetchCategories } from '../utils/fetchCategories'
import { fetchProducts } from './../utils/fetchProducts'
import { getSession } from 'next-auth/react'

function Home({ categories, products }) {
  return (
    <div>
      <Head>
        <title>Room 4 mommy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-[#f0f7fd]">
        <Header />
      </div>

      <Basket />

      <main className="relative bg-[#f0f7fd]">
        <Landing />
      </main>

      <section className="bg-gradient-to-b from-[#f0f7fd]">
        <Categories categories={categories} products={products} />
      </section>

      <footer className="bg-[#eff8ff]">
        <Footer categories={categories} />
      </footer>
    </div>
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
