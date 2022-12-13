import Head from 'next/head'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Header from './../../components/Header'
import { client, urlFor } from '../../lib/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../../redux/basketSlice'
import { toast } from 'react-hot-toast'
import { fetchCategories } from '../../utils/fetchCategories'

const ProductPage = ({ product: serverPost }) => {
  const [product, setProduct] = useState(serverPost)
  const [category, setCategory] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    async function load() {
      const query = `*[_type == "product" && slug.current == '${router.query.slug}'][0]`
      const data = await client.fetch(query)

      setProduct(data)
    }

    if (!serverPost) {
      load()
    }
  }, [])

  const addItemToBasket = () => {
    dispatch(addToBasket(product))

    toast.success(`${product.title} added to basket`, {
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
        {/* добавить все метатайтлы в сайнити */}
      </Head>
      <Header />
      <div className="my-8 flex flex-row justify-evenly">
        <div className="relative h-[555px] w-[555px]">
          <Image
            src={urlFor(product.image).width(200).height(200).url()}
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-evenly">
          <h1 className="text-5xl font-bold text-[#404e65]">{product.title}</h1>
          <p>
            Perk up imaginary play with this single-serve coffee maker. Do you
            take milk or sugar?
          </p>
          <h1 className="text-3xl font-extrabold text-[#ff5b4b]">
            {product.price}₴
          </h1>
          <div>
            <button
              onClick={addItemToBasket}
              className="rounded bg-gradient-to-t from-[#ffb74a] to-[#ff5b4b] px-24 py-2 text-base font-bold text-white transition active:scale-95"
            >
              Add to cart
            </button>
          </div>
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
