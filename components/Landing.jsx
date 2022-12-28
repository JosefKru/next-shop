import Image from 'next/image'
import Button from './Button'
import { useState } from 'react'
import { urlFor } from '../lib/client'

const Landing = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fadeState, setFadeState] = useState('fadeIn')
  const animateProducts = products.slice(0, 5)

  const interval = setInterval(() => {
    goToNext()
    setFadeState('fadeIn')
  }, 5000)

  const goToNext = () => {
    const isLastSlide = currentIndex === animateProducts.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)

    setFadeState('fadeOut')
    clearInterval(interval)
  }

  return (
    <section className='sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8'>
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
        className={`relative hidden h-[450px] w-[600px] transition-all duration-300 md:inline lg:h-[650px] lg:w-[600px] ${
          fadeState === 'fadeIn' ? 'animate-fadeIn' : 'animate-fadeOut'
        } `}
      >
        <Image
          src={urlFor(animateProducts[currentIndex].image[0]).url()}
          layout='fill'
          objectFit='contain'
          alt=''
        />
      </div>
    </section>
  )
}

export default Landing
