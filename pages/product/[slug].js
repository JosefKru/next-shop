import Head from 'next/head'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Description from '../../components/Description'
import Header from './../../components/Header'
import { client, urlFor } from '../../lib/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, selectBasketItems } from '../../redux/basketSlice'
import { toast } from 'react-hot-toast'

const ProductPage = ({ product: serverProduct }) => {
  const [productAmount, setProductAmount] = useState(1)
  const [product, setProduct] = useState(serverProduct)
  const router = useRouter()
  const dispatch = useDispatch()
  const items = useSelector(selectBasketItems)
  // const itemsGroup = items.filter((item) => item._id === product?._id)

  useEffect(() => {
    async function load() {
      const query = `*[_type == "product" && slug.current == '${router.query.slug}'][0]`
      const data = await client.fetch(query)

      setProduct(data)
    }

    if (!serverProduct) {
      load()
    }
  }, [items, serverProduct, router.query.slug])

  const addItemToBasket = () => {
    dispatch(addToBasket(product))

    toast.success(`${product.title} added to basket`, {
      position: 'bottom-center',
    })
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
        <div className="flex flex-col p-4 md:w-[460px] ">
          <h1 className="pb-6 text-3xl font-bold text-[#404e65] md:text-5xl">
            {product.title}
          </h1>
          <Description body={product.description} />
          <h1 className="pb-6 text-3xl font-extrabold text-[#ff5b4b]">
            {product.price}₴
          </h1>
          <div>
            <div className="flex flex-row">
              <div className="mr-4 flex w-24 flex-row items-center justify-around rounded border py-2">
                <button
                  onClick={() => setProductAmount(productAmount - 1)}
                  className={`cursor-pointer divide-slate-400 text-xl font-bold opacity-50 hover:opacity-80 ${
                    productAmount <= 1 && 'opacity-40 hover:opacity-40'
                  }`}
                  disabled={productAmount <= 1}
                >
                  -
                </button>
                {/* <span className="text-xl">{itemsGroup.length}</span> */}
                <span className="text-xl">{productAmount}</span>
                <button
                  className="cursor-pointer text-xl font-bold opacity-50 hover:opacity-80"
                  onClick={() => setProductAmount(productAmount + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={addItemToBasket}
                className="inline-block rounded bg-gradient-to-t from-[#ffb74a] to-[#ff5b4b] px-6 py-2 text-base font-bold text-white transition active:scale-95"
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

          <Description body={product.description} />
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

export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const product = await client.fetch(query)

  return {
    props: {
      product,
    },
  }
}
