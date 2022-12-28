import Image from 'next/image'
import Currency from 'react-currency-formatter'
import toast from 'react-hot-toast'
import { urlFor } from '../lib/client'
import { GrFormDown } from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import { removeFromBasket } from '../redux/basketSlice'
import Link from 'next/link'

const CheckoutProduct = ({ items, id }) => {
  const dispatch = useDispatch()

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }))

    toast.error(`${items[0].title} removed from basket`, {
      position: 'bottom-center',
    })
  }

  return (
    <div className='flex flex-col gap-x-4 border-b border-gray-300 py-5 lg:flex-row lg:items-center'>
      <div className='relative h-44 w-44'>
        <Link href={`/product/${encodeURIComponent(items[0].slug.current)}`}>
          <a>
            <Image
              src={urlFor(items[0].image[0]).url()}
              layout='fill'
              objectFit='contain'
              alt='product'
            />
          </a>
        </Link>
      </div>

      <div className='flex flex-1 items-end lg:items-center'>
        <div className='flex-1 space-y-4'>
          <div className='flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl'>
            <Link
              href={`/product/${encodeURIComponent(items[0].slug.current)}`}
            >
              <a>
                <h4 className='font-semibold lg:w-96'>{items[0].title}</h4>
              </a>
            </Link>
            <p className='flex items-end gap-x-1 font-semibold'>
              {items.length}
              <GrFormDown className='h-6 w-6' color='blue' />
            </p>
          </div>
          <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
            Show product details
            <GrFormDown className='h-6 w-6' color='#56b0f2' />
          </p>
        </div>
        <div className='flex flex-col items-end space-y-4'>
          <h4 className='text-xl font-semibold lg:text-2xl'>
            <Currency
              quantity={items.reduce((total, item) => total + item.price, 0)}
              currency='UAH'
            />
          </h4>
          <button
            onClick={removeItemFromBasket}
            className='text-blue-500 hover:underline'
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProduct
