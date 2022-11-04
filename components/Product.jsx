import Image from 'next/image'
import { urlFor } from '../lib/client'

const Product = ({ image, title, price }) => {
  return (
    <div className="flex h-[305px] w-[140px] select-none rounded-xl bg-[#ffffff] px-2 py-3 md:h-[395px] md:w-[262px] ">
      <div className="relative h-36 w-36  md:h-20">
        <Image
          src={urlFor(image).url()}
          layout="fill"
          objectFit="contain"
          alt=""
        />
      </div>

      <div className="">
        {/* <div className="space-y-2 text-xl text-white md:text-2xl">
          <p>{title}</p>
          <p>{price}</p>
        </div> */}

        {/* <div className="flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]">
          123
        </div> */}
      </div>
    </div>
  )
}

export default Product
