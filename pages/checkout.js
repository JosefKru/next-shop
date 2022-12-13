import Head from 'next/head'
import Header from '../components/Header'
import CheckoutProduct from '../components/CheckoutProduct'
import Button from '../components/Button'
import Form from './../components/Form'
import Currency from 'react-currency-formatter'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { selectBasketItems, selectBasketTotal } from '../redux/basketSlice'
import Footer from '../components/Footer'
import Image from 'next/image'

const Checkout = () => {
  const [isVisible, setIsVisible] = useState(false)
  const basketTotal = useSelector(selectBasketTotal)
  const items = useSelector(selectBasketItems)
  const router = useRouter()
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState({})
  const handleOnClose = () => setIsVisible(false)

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      ;(results[item._id] = results[item._id] || []).push(item)
      return results
    }, {})

    setGroupedItemsInBasket(groupedItems)
  }, [items])

  return (
    <div className="min-h-screen overflow-hidden">
      <Head>
        <title>Cart | Room4mommy</title>
      </Head>

      <Header />

      <main className="mx-auto max-w-5xl pb-24">
        <div className="flex flex-col items-center justify-center">
          <h1 className="my-4 text-3xl font-extrabold text-[#404e65] lg:text-4xl">
            {items.length > 0 ? 'Review your cart' : 'Cart'}
          </h1>
          {items.length === 0 && (
            <>
              <div className="relative h-72 w-72">
                <Image
                  src="/empty-cart.png"
                  layout="fill"
                  objectFit="contain"
                  alt="empty cart"
                />
              </div>
              <p className="mb-12 text-xl font-bold text-[#404e65]">
                Your cart is currently empty.
              </p>
              <Button
                title="Continue Shopping"
                onClick={() => router.push('/')}
              />
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}
            <div className="my-12 mt-6 ml-auto max-w-3xl">
              <div className="pb-4 ">
                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <p>Total</p>
                  <p>
                    <Currency quantity={basketTotal} currency="UAH" />
                  </p>
                </div>
                <hr />
                <div className="mt-8 text-center">
                  <button
                    className="rounded bg-[#ff5b4b] px-14 py-2 text-base font-bold text-white transition hover:scale-95"
                    onClick={() => setIsVisible(true)}
                  >
                    Checkout
                  </button>
                  <Form visible={isVisible} onClose={handleOnClose} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Checkout
