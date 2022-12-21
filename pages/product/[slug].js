import Head from 'next/head'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Header from './../../components/Header'
import { client, urlFor } from '../../lib/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
} from '../../redux/basketSlice'
import { toast } from 'react-hot-toast'

const ProductPage = ({ product: serverPost }) => {
  const [product, setProduct] = useState(serverPost)
  const router = useRouter()
  const dispatch = useDispatch()
  const items = useSelector(selectBasketItems)
  const itemsGroup = items.filter((item) => item._id === product?._id)

  useEffect(() => {
    async function load() {
      const query = `*[_type == "product" && slug.current == '${router.query.slug}'][0]`
      const data = await client.fetch(query)

      setProduct(data)
    }

    if (!serverPost) {
      load()
    }
  }, [items, serverPost, router.query.slug])

  const addItemToBasket = () => {
    dispatch(addToBasket(product))

    toast.success(`${product.title} added to basket`, {
      position: 'bottom-center',
    })
  }

  const removeItemFromBusket = () => {
    dispatch(removeFromBasket(product))

    toast.error(`${product.title} removed from basket`, {
      position: 'bottom-center',
    })
  }

  if (!product) {
    return <p>loading</p>
  }
  return (
    <>
      <Head>
        <title>{product.metaTitle}</title>
      </Head>
      <Header />

      <div className="mt-10 flex flex-col items-center justify-evenly md:mb-72 md:ml-8 md:flex-row">
        <div className="relative h-[360px] w-[360px] md:h-[555px] md:w-[555px]">
          <Image
            src={urlFor(product.image).width(200).height(200).url()}
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>
        <div className="flex flex-col p-4 md:w-[460px]">
          <h1 className="p-2 text-3xl font-bold text-[#404e65] md:text-5xl">
            {product.title}
          </h1>
          <p className="hidden h-60 p-2 md:block">DESCRIPTION FROM SANITY</p>
          <h1 className="p-2 text-3xl font-extrabold text-[#ff5b4b] ">
            {product.price}₴
          </h1>
          <div>
            <div className="flex flex-row">
              <div className="mr-4 flex w-24 flex-row items-center justify-around rounded border py-2">
                <span
                  className="cursor-pointer text-xl opacity-70"
                  onClick={removeItemFromBusket}
                >
                  -
                </span>
                <span className="text-xl">{itemsGroup.length}</span>
                <span
                  className="cursor-pointer text-xl opacity-70"
                  onClick={addItemToBasket}
                >
                  +
                </span>
              </div>
              <button
                onClick={addItemToBasket}
                className="inline-block rounded bg-gradient-to-t from-[#ffb74a] to-[#ff5b4b] px-12 py-2 text-base font-bold text-white transition active:scale-95 md:px-24"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="my-24 flex flex-col items-center justify-center md:hidden">
          <div className="mb-8 w-36 rounded-3xl border-4 border-[#56b0f2] py-2 px-5 text-sm font-bold text-[#56b0f2] md:text-base">
            DESCRIPTION
          </div>

          <p className="">DESCRIPTION FROM SANITY</p>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ProductPage

export async function getStaticPaths() {
  const query = `*[_type == "product" ] {
    slug {
        current
    }
  }`

  const product = await client.fetch(query)
  const paths = product.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params: { slug }, req }) {
  if (!req) {
    return {
      props: {
        product: null,
      },
    }
  }

  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const product = await client.fetch(query)

  return {
    props: {
      product,
    },
  }
}
