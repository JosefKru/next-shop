import Image from 'next/image'
import Button from './Button'
import { useState } from 'react'
import { urlFor } from '../lib/client'
import { GoPrimitiveDot } from 'react-icons/go'
import Link from 'next/link'

const Landing = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fadeState, setFadeState] = useState('fadeIn')
  const animateProducts = products.slice(0, 5)

  console.log(animateProducts)

  const interval = setInterval(() => {
    goToNext()
    setFadeState('fadeIn')
  }, 1000)

  const goToNext = () => {
    const isLastSlide = currentIndex === animateProducts.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)

    setFadeState('fadeOut')
    clearInterval(interval)
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <section>
      <div className='mx-auto mb-14 flex h-[550px] max-w-[1350px] items-end justify-between px-8 md:mb-8 md:items-center'>
        <div className='space-y-8'>
          <h1 className='h-44 space-y-3 text-5xl font-semibold tracking-wide md:h-64 lg:text-6xl xl:text-7xl'>
            <span className='block text-[#404e65]'>
              {animateProducts[currentIndex].title.split(' ')[0]}
            </span>
            <span className='block text-[#404e65]'>
              {animateProducts[currentIndex].title.split(' ')[1] || ''}
            </span>
            <span className='block text-[#404e65]'>
              {animateProducts[currentIndex].title.split(' ')[2] || ''}
            </span>
          </h1>

          <div className='space-x-8'>
            <Button title='Buy Now' />
            <a className='link'>Learn More</a>
          </div>
        </div>

        <div
          className={`relative hidden h-[450px] w-[600px] select-none md:inline lg:h-[650px] lg:w-[600px] ${
            fadeState === 'fadeIn' ? 'animate-fadeIn' : 'animate-fadeOut'
          }`}
        >
          <Link
            href={`/product/${encodeURIComponent(
              animateProducts[currentIndex].slug.current
            )}`}
          >
            <a>
              <Image
                priority
                src={urlFor(animateProducts[currentIndex].image[0]).url()}
                layout='fill'
                objectFit='contain'
                alt=''
              />
            </a>
          </Link>
        </div>
      </div>

      <div className='flex justify-center'>
        {animateProducts.map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`m-1 cursor-pointer text-[#404e65] opacity-80 transition-all hover:text-[#56b0f2] hover:opacity-100 ${
              slideIndex == currentIndex ? 'text-[#56b0f2]' : 'text-[#404e65]'
            }`}
            onClick={() => goToSlide(slideIndex)}
          >
            <GoPrimitiveDot size='25' />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Landing
