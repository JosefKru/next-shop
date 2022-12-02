import Head from 'next/head'
import Header from '../components/Header'
import Landing from './../components/Landing'
import Basket from '../components/Basket'
import Product from './../components/Product'
import { fetchCategories } from '../utils/fetchCategories'
import { Tab } from '@headlessui/react'
import { fetchProducts } from './../utils/fetchProducts'
import { getSession } from 'next-auth/react'

function Home({ categories, products }) {
  const showProducts = (category) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((product) => (
        <Product {...product} product={product} key={product._id} />
      ))
  }

  return (
    <div>
      <Head>
        <title>Room 4 mommy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Basket />

      <main className="relative bg-[#f0f7fd]">
        <Landing />
      </main>

      <section className="bg-gradient-to-b from-[#f0f7fd]">
        <div className="space-y-10 py-16">
          <h1 className="text-center text-4xl font-bold tracking-wide text-[#404e65] md:text-5xl">
            New Promos
          </h1>

          <Tab.Group>
            <Tab.List className="flex items-center justify-center ">
              {categories.map((category) => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({ selected }) =>
                    `mx-4 whitespace-nowrap rounded-3xl border-4 py-2 px-5 font-bold focus:outline-none sm:text-xs md:text-base  ${
                      selected
                        ? 'border-[#56b0f2] text-[#56b0f2] '
                        : 'text-[#747474]'
                    }`
                  }
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
              <Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
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
