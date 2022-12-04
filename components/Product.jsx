import Image from 'next/image'
import { urlFor } from '../lib/client'
import { RiShoppingBasketLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../redux/basketSlice'
import toast from 'react-hot-toast'

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

      <div className="pt-3 font-bold">
        <div className="space-y-2 text-sm text-[#404e65] hover:text-[#56b0f2] md:text-xl">
          <p>{product.title}</p>
          <p className="text-[#56b0f2]">{product.price}₴</p>
        </div>

        <div
          onClick={addItemToBasket}
          className="flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[40px] md:w-[40px]"
        >
          <RiShoppingBasketLine />
        </div>
      </div>
    </div>
  )
}

export default Product
