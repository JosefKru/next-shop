import Image from 'next/image'
import { urlFor } from '../lib/client'
import { RiShoppingBasketLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../redux/basketSlice'
import toast from 'react-hot-toast'
import Link from 'next/link'

const Product = ({ product }) => {
  const dispatch = useDispatch()

  const addItemToBasket = () => {
    dispatch(addToBasket(product))

    toast.success(`${product.title} added to basket`, {
      position: 'bottom-center',
    })
  }

  return (
    <div className="h-[305px] w-40 select-none rounded-xl border-2 bg-[#ffffff] p-6 md:h-[395px] md:w-[262px]">
      <div className="relative h-28 w-28 md:h-52 md:w-52">
        <Image
          src={urlFor(product.image).width(210).height(210).url()}
          layout="fill"
          objectFit="contain"
          alt=""
        />
      </div>

      <div className="relative pt-3 font-bold">
        <div className="space-y-2 text-sm text-[#404e65] transition-all duration-200 ease-in hover:text-[#56b0f2] md:text-xl">
          <Link href={`/product/${encodeURIComponent(product.slug.current)}`}>
            <a>
              <p>{product.title}</p>
            </a>
          </Link>
          <hr />
          <p className="absolute top-[80px] left-1 font-extrabold text-[#56b0f2]">
            {product.price}₴
          </p>
        </div>

        <div
          onClick={addItemToBasket}
          className=" cursor-pointer text-[#56b0f2] transition-all duration-200 hover:text-[#404e65] "
        >
          <div className="absolute top-[120px] left-0">
            <RiShoppingBasketLine
              size="22"
              className="bold mr-2 mb-1 inline-block text-lg"
            />
            <span className="text-sm font-light md:font-semibold">
              Add to cart
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
