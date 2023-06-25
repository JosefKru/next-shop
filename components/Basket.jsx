import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../redux/basketSlice'
import Image from 'next/image'

const Basket = () => {
  const items = useSelector(selectBasketItems)

  if (items.length === 0) return null

  return (
    <Link href='/checkout'>
      <div className='fixed bottom-10 right-6 z-50 h-16 w-16 md:h-20 md:w-20'>
        {items.length > 0 && (
          <span className='absolute -right-2 -top-2 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#fde201] to-[#d5e100] text-[14px] font-bold text-white'>
            {items.length}
          </span>
        )}
        <Image
          src='/cart.png'
          alt=''
          layout='fill'
          objectFit='contain'
          className='cursor-pointer opacity-100 transition hover:opacity-100 md:opacity-90'
        />
      </div>
    </Link>
  )
}

export default Basket
