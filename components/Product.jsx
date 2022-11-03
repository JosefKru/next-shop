import Image from 'next/image'
import { urlFor } from '../lib/client'

const Product = ({ product }) => {
  console.log(product.image)
  return (
    <div>
      <div>
        <Image
          src={urlFor(product.image[0]).width(500).height(300).url()}
          layout="fill"
          objectFit="contain"
          alt=""
        />
      </div>
    </div>
  )
}

export default Product
