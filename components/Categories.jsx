import { Tab } from '@headlessui/react'
import Product from './Product'

const Categories = ({ categories, products }) => {
  const showProducts = (category) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((product) => (
        <Product {...product} product={product} key={product._id} />
      ))
  }
  return (
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
                `mx-4 whitespace-nowrap rounded-3xl border-4 py-2 px-5 text-xs font-bold focus:outline-none sm:text-sm md:text-base ${
                  selected
                    ? 'border-[#56b0f2] text-[#56b0f2]'
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
  )
}

export default Categories
