import Image from 'next/image'
import { urlFor } from '../lib/client'
import { RiShoppingBasketLine } from 'react-icons/ri'
import reducer from '../reducer/reducer'
import { useReducer } from 'react'

const Product = ({ image, title, price }) => {
  const [state, dispatch] = useReducer(reducer, [])

  const addItem = (e) => {
    dispatch({ type: 'add' })
  }

  return (
    <div className="h-[305px] w-40 select-none rounded-xl border-2 bg-[#ffffff] p-2 md:h-[395px]  md:w-[262px]">
      <div className="relative h-36 w-36 md:h-52 md:w-52">
        <Image
          src={urlFor(image).url()}
          layout="fill"
          objectFit="contain"
          alt=""
        />
      </div>

      <div className="">
        <div className="space-y-2 text-sm md:text-xl">
          <p>{title}</p>
          <p>{price}</p>
        </div>

        <div
          onClick={addItem}
          className="flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[40px] md:w-[40px]"
        >
          <RiShoppingBasketLine />
        </div>
      </div>
    </div>
  )
}

export default Product
