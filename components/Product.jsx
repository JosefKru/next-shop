import Image from 'next/image'
import { urlFor } from '../lib/client'

const Product = ({ image, title, price }) => {
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

        {/* <div className="flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]">
          123
        </div> */}
      </div>
    </div>
  )
}

export default Product
