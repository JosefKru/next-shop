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
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#f0f7fd]">
      <Head>
        <title>Cart | Room4mommy</title>
        <link href="//fonts.googleapis.com/css?family=Open+Sans%3Aregular%2C500%2C700%2C800%7CFredoka+One%3Aregular%7CMontserrat%3Aregular%2C500%2C700%2C800%26subset%3Dlatin%2Clatin-ext" />
      </Head>

      <Header />

      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-5 ">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {items.length > 0 ? 'Review your bag' : 'Your bag is empt'}
          </h1>

          {items.length === 0 && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push('/')}
            />
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
    </div>
  )
}

export default Checkout
