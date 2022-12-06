import Link from 'next/link'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../redux/basketSlice'

const Basket = () => {
  const items = useSelector(selectBasketItems)

  if (items.length === 0) return null

  return (
    <Link href="/checkout">
      <div className="fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-[#56b0f2]">
        {items.length > 0 && (
          <span className="absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-[#ff5b4b] text-[14px] font-bold text-white">
            {items.length}
          </span>
        )}
        <HiOutlineShoppingCart className="headerIcon h-8 w-8 text-white" />
      </div>
    </Link>
  )
}

export default Basket
