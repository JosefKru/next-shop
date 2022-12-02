import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Currency from 'react-currency-formatter'
import { useEffect, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { useMediaQuery } from 'react-responsive'
import Button from '../components/Button'
import { useRouter } from 'next/router'

const Success = () => {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  return (
    <div>
      <Head>
        <title>Thank you! - Room 4 Mommy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mx-auto max-w-xl pt-3">
        <Link href="/">
          <div className="relative ml-4 h-20 w-40 cursor-pointer opacity-90 transition hover:opacity-100 lg:hidden">
            <Image
              src="/logo.svg"
              layout="fill"
              objectFit="contain"
              alt="logo"
            />
          </div>
        </Link>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-9">
        <section className="order-2 mx-auto max-w-xl pb-12 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
          <Link href="/">
            <div className="relative ml-14 hidden h-28 w-44 cursor-pointer opacity-90 transition hover:opacity-100 lg:inline-flex">
              <Image
                src="/logo.svg"
                layout="fill"
                objectFit="contain"
                alt="logo"
              />
            </div>
          </Link>

          <div className="my-8 ml-4 flex space-x-4 lg:ml-14">
            <div className="flex h-11 w-11 items-center justify-center rounded-full">
              <AiFillCheckCircle size="40" color="#56b0f2" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Oreder #number</p>
              <h4 className="text-lg">Thank you! ... name</h4>
            </div>
          </div>

          <div className="mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14">
            <div className="space-y-2">
              <p>Your order is confirmed</p>
              <p className="text-sm text-gray-600">
                We have received your order and are preparing it. We will
                contact you shortly
              </p>
            </div>
          </div>

          <div className="mx-4 my-4 flex flex-col items-center justify-between  text-sm lg:ml-14 lg:flex-row">
            <p className="hidden lg:inline">Need help? Contact us</p>
            {mounted && (
              <Button
                title="Continue Shopping"
                onClick={() => router.push('/')}
                width={isTabletOrMobile ? 'w-full' : undefined}
                padding="py-4"
              />
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Success
