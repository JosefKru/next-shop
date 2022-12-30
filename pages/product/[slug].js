import Head from 'next/head'
import Footer from '../../components/Footer'
import Description from '../../components/Description'
import Header from './../../components/Header'
import { client } from '../../lib/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, selectBasketItems } from '../../redux/basketSlice'
import { toast } from 'react-hot-toast'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import ImageSlider from '../../components/ImageSlider'
import { ReactImageGallery } from 'react-image-gallery'

const ProductPage = ({ product: serverProduct, imageGallery }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [productAmount, setProductAmount] = useState(1)
  const [product, setProduct] = useState(serverProduct)
  const router = useRouter()
  const dispatch = useDispatch()
  const items = useSelector(selectBasketItems)
  const itemsGroup = items.filter((item) => item._id === product?._id)

  // const settingsOfImages = product.map((obj) => {
  //   return {
  //     original: urlFor(obj.image[0]).url(),
  //     // originalWidth: '300px',
  //     // originalHeight: '300px',
  //     description: obj.title,
  //     originalTitle: obj.title,
  //     // originalClass:
  //     // 'h-[300px] w-[300px] md:w-[450px] md:h-[450px] cursor-auto',
  //     // bulletClass: `bg-[#404e65] opacity-80 hover:text-[#56b0f2] hover:opacity-100`,
  //   }
  // })

  useEffect(() => {
    async function load() {
      const query = `*[_type == "product" && slug.current == '${router.query.slug}'][0]`
      const data = await client.fetch(query)

      setProduct(data)
    }

    if (!serverProduct) {
      load()
    }
  }, [serverProduct, router.query.slug])

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

      <div className='mt-10 flex flex-col items-center justify-evenly md:mb-72 md:ml-8 md:flex-row'>
        <div className='h-[360px] w-[360px] select-none self-start transition-opacity ease-in-out md:h-[555px] md:w-[555px]'>
          <ImageSlider imageGallery={imageGallery} product={product} />
        </div>
        <div className='mt-6 flex flex-col p-4 md:w-[460px] '>
          <h1 className='pb-6 text-3xl font-bold text-[#404e65] md:text-5xl'>
            {product.title}
          </h1>
          <div className='hidden h-[360px] md:block'>
            <Description body={product.description} />
          </div>
          <h1 className='pb-6 text-3xl font-extrabold text-[#ff5b4b]'>
            {product.price}₴
          </h1>
          <div>
            <div className='flex flex-row'>
              <div className='mr-4 flex w-24 flex-row items-center justify-around rounded border py-2'>
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
                <span className='text-xl'>{productAmount}</span>
                <button
                  className='cursor-pointer text-xl font-bold opacity-50 hover:opacity-80'
                  onClick={() => setProductAmount(productAmount + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={addItemToBasket}
                className='inline-block rounded bg-gradient-to-t from-[#ffb74a] to-[#ff5b4b] px-6 py-2 text-base font-bold text-white transition active:scale-95'
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className='my-24 flex flex-col items-center justify-center md:hidden'>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className='relative mb-8 w-[170px] rounded-3xl border-4 border-[#56b0f2] py-2 px-5 text-sm font-bold text-[#56b0f2] md:text-base'
          >
            DESCRIPTION
            <span className='absolute top-[10px] left-[125px] inline-block'>
              {isOpen ? (
                <AiFillCaretUp size='15' />
              ) : (
                <AiFillCaretDown size='15' />
              )}
            </span>
          </div>
          {isOpen && (
            <div className='px-8'>
              <Description body={product.description} />
            </div>
          )}
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
  const imageGallery = await client.fetch(`*[_type == 'product'] {
    _id,
    title,
    image[]{
     asset->{url}
    }
  }`)

  return {
    props: {
      product,
      imageGallery,
    },
  }
}
