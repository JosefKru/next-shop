import Head from 'next/head'
import Header from '../components/Header'
import Landing from './../components/Landing'
import Product from './../components/Product'
import { fetchCategories } from '../utils/fetchCategories'
import { Tab } from '@headlessui/react'
import { fetchProducts } from './../utils/fetchProducts'

function Home({ categories, products }) {
  const showProducts = (category) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((product) => <Product product={product} key={product._id} />)
  }

  return (
    <div>
      <Head>
        <title>Room 4 mommy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative bg-[#f0f7fd]">
        <Landing />
      </main>

      <section className="  bg-gradient-to-b from-[#f0f7fd]">
        <div className="space-y-10 py-16">
          <h1 className="text-center text-4xl font-bold tracking-wide text-[#404e65] md:text-5xl">
            New Promos
          </h1>

          <Tab.Group>
            <Tab.List className="flex justify-center">
              {categories.map((category) => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({ selected }) =>
                    `mx-4 whitespace-nowrap rounded-3xl border-4 py-2 px-5 font-bold focus:outline-none md:text-base ${
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

export const getServerSideProps = async () => {
  const categories = await fetchCategories()
  const products = await fetchProducts()

  return {
    props: { categories, products },
  }
}
