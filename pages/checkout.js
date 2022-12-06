import Head from 'next/head'
import Header from '../components/Header'
import CheckoutProduct from '../components/CheckoutProduct'
import Button from '../components/Button'
import Currency from 'react-currency-formatter'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { selectBasketItems, selectBasketTotal } from '../redux/basketSlice'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

const Checkout = () => {
  const basketTotal = useSelector(selectBasketTotal)
  const items = useSelector(selectBasketItems)
  const router = useRouter()
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState({})

  const form = useRef()
  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_htvfto3',
        'template_2jdv8nc',
        form.current,
        'Ub7F2x9MTVHibIcxU'
      )
      .then(
        (result) => {
          console.log(result.text)
          if (result.text === 'OK') {
            router.push('/success')
          }
        },
        (error) => {
          console.log(error.text)
        }
      )

    toast.success('Thank you! Information transferred.')
  }

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
        <title>Bag - Room4mommy</title>
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
                <form ref={form} onSubmit={sendEmail} className="formInfo">
                  <label className="mt-4">Name</label>
                  <input type="text" name="user_name" className="formInput" />
                  <label className="mt-4">Email</label>
                  <input type="email" name="user_email" className="formInput" />
                  <label className="mt-4">Message</label>
                  <textarea name="message" className="formTextarea" />
                  <input
                    type="submit"
                    value="Send"
                    className="mt-8 w-[100%] cursor-pointer border-none bg-[#56b0f2] p-3 text-white "
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Checkout
