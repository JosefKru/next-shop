import Image from 'next/image'
import Currency from 'react-currency-formatter'
import Header from '../components/Header'
import CheckoutProduct from '../components/CheckoutProduct'
import Button from '../components/Button'
import Form from './../components/Form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeAllFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../redux/basketSlice'
import { fetchPostJSON } from './api/api-helpers'
import getStripe from '../utils/get-stripejs'
import MainLayout from './layouts/main'

const Checkout = () => {
  const [isVisible, setIsVisible] = useState(false)
  const basketTotal = useSelector(selectBasketTotal)
  const dispatch = useDispatch()
  const items = useSelector(selectBasketItems)
  const router = useRouter()
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState({})
  const handleOnClose = () => setIsVisible(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      ;(results[item._id] = results[item._id] || []).push(item)
      return results
    }, {})

    setGroupedItemsInBasket(groupedItems)
  }, [items])

  const createCheckoutSession = async (e) => {
    setLoading(true)

    const checkoutSession = await fetchPostJSON('/api/checkout_sessions', {
      items: items,
    })

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()

    const { error } = await stripe.redirectToCheckout({
      // Вместо заполнителя {{CHECKOUT_SESSION_ID}} передаем значение поля id,
      // полученное из ответа API при создании сеанса оформления заказа.
      sessionId: checkoutSession.id,
    })

    console.warn(error.message)

    setLoading(false)
  }

  return (
    <div className='min-h-screen overflow-hidden'>
      <MainLayout metaTitle='Cart | Room4mommy'>
        <Header />

        <main className='mx-auto max-w-5xl pb-24'>
          <div className='flex flex-col items-center justify-center'>
            {items.length !== 0 && (
              <h1 className='my-4 text-3xl font-extrabold text-[#404e65] lg:text-4xl'>
                Checkout
              </h1>
            )}
            {items.length === 0 && (
              <>
                <div className='relative h-72 w-72'>
                  <Image
                    src='/empty-cart1.png'
                    layout='fill'
                    objectFit='contain'
                    alt='empty cart'
                  />
                </div>
                <p className='mb-12 text-xl font-bold text-[#404e65]'>
                  Your cart is currently empty.
                </p>
                <Button
                  title='Continue Shopping'
                  onClick={() => router.push('/')}
                />
              </>
            )}
          </div>

          {items.length > 0 && (
            <div className='mx-5 md:mx-8'>
              {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                <CheckoutProduct key={key} items={items} id={key} />
              ))}
              <div className='my-12 mt-6 ml-auto max-w-3xl'>
                <div className='pb-4 '>
                  <div className='flex justify-between pt-4 text-xl font-semibold'>
                    <p>Total</p>
                    <p>
                      <Currency quantity={basketTotal} currency='UAH' />
                    </p>
                  </div>
                  <hr />
                  <div className='mt-8 text-center'>
                    {/* <button
                    className='rounded bg-gradient-to-t from-[#ffb74a] to-[#ff5b4b] px-8 py-2 text-base font-bold text-white transition active:scale-95'
                    onClick={() => setIsVisible(true)}
                  >
                    Checkout
                  </button> */}
                    <Button
                      title='Check Out'
                      className='rounded bg-gradient-to-t from-[#ffb74a] to-[#ff5b4b] px-8 py-2 text-base font-bold text-white transition active:scale-95'
                      onClick={() => {
                        createCheckoutSession()
                        dispatch(removeAllFromBasket)
                      }}
                      loading={loading}
                    />

                    <Form visible={isVisible} onClose={handleOnClose} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </MainLayout>
    </div>
  )
}

export default Checkout
