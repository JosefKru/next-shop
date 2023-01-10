import Image from 'next/image'
import Button from './Button'
import { useRef, useState } from 'react'
import { urlFor } from '../lib/client'
import { GoPrimitiveDot } from 'react-icons/go'
import Link from 'next/link'
import ReactImageGallery from 'react-image-gallery'

const Landing = ({ products }) => {
  const ref = useRef(null)
  console.log(ref.current)
  const [currentIndex, setCurrentIndex] = useState(0)
  const animateProducts = products.slice(0, 5)

  const slidesSettings = animateProducts.map((obj) => {
    return {
      original: urlFor(obj.image[0]).url(),
      description: (
        <Link href={`/product/${encodeURIComponent(obj.slug.current)}`}>
          {obj.title}
        </Link>
      ),
      originalClass:
        'h-[300px] w-[300px] md:w-[550px] md:h-[550px] cursor-auto',
    }
  })

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

        <div className='flex h-[350px] w-[250px] justify-center lg:h-[500px] lg:w-[600px]'>
          <ReactImageGallery
            ref={ref}
            showThumbnails={false}
            slideInterval={5000}
            slideDuration={800}
            showNav={false}
            autoPlay={true}
            items={slidesSettings}
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
