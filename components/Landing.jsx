import Image from 'next/image'
import Button from './Button'
import { useState } from 'react'
import { urlFor } from '../lib/client'
import { GoPrimitiveDot } from 'react-icons/go'
import Link from 'next/link'
import ReactImageGallery from 'react-image-gallery'
import { createRef } from 'react'

const Landing = ({ products }) => {
  const getCurrentIndex = createRef()
  const [currentIndex, setCurrentIndex] = useState(0)
  const animateProducts = products.slice(0, 5)

  console.log(getCurrentIndex)

  const settingsOfImages = animateProducts.map((obj) => {
    return {
      original: urlFor(obj.image[0]).url(),
      originalWidth: '300px',
      originalHeight: '300px',
      description: (
        <Link href={`/product/${encodeURIComponent(obj.slug.current)}`}>
          {obj.title}
        </Link>
      ),
      originalTitle: obj.title,
      originalClass:
        'h-[300px] w-[300px] md:w-[450px] md:h-[450px] cursor-auto ',
      // bulletClass: `bg-[#404e65] opacity-80 hover:text-[#56b0f2] hover:opacity-100`,
    }
  })

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <section>
      <div className='mx-auto flex h-[400px] max-w-[1350px] flex-col-reverse items-center justify-between px-8 md:h-[550px] md:flex-row'>
        <div className='z-20 hidden w-[200px] flex-col items-center justify-center space-y-8 md:flex md:w-[500px]'>
          <Link
            href={`/product/${encodeURIComponent(
              animateProducts[currentIndex].slug.current
            )}`}
          >
            <a>
              <h1 className=' h-44 space-y-3 text-5xl font-semibold tracking-wide  md:h-64 lg:text-6xl xl:text-7xl'>
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
            </a>
          </Link>

          <div className='space-x-8'>
            <Button title='Add to cart' />
            <a className='link'>Learn More</a>
          </div>
        </div>

        <div className='z-10 flex h-[350px] w-[250px] justify-center lg:h-[500px] lg:w-[600px]'>
          {/* <Image
                priority
                src={urlFor(animateProducts[currentIndex].image[0]).url()}
                layout='fill'
                objectFit='contain'
                alt=''
              /> */}

          <ReactImageGallery
            ref={getCurrentIndex}
            showThumbnails={false}
            // thumbnailPosition='left'
            slideInterval={5000}
            slideDuration={800}
            showNav={false}
            autoPlay={true}
            items={settingsOfImages}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={true}
          />
        </div>
      </div>
    </section>
  )
}

export default Landing
