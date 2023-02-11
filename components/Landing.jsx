import { useState } from 'react'
import { urlFor } from '../lib/client'
import Link from 'next/link'
import ReactImageGallery from 'react-image-gallery'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../redux/basketSlice'
import { toast } from 'react-hot-toast'

const Landing = ({ products }) => {
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
        'h-[360px] w-[360px] md:w-[600px] md:h-[600px] cursor-auto',
    }
  })
  const dispatch = useDispatch()

  const addProduct = () => {
    dispatch(addToBasket(animateProducts[currentIndex]))
    toast.success(`${animateProducts[currentIndex].title} added to basket`, {
      position: 'bottom-center',
    })
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
            <Button title='Add to cart' onClick={() => addProduct()} />
            <Link
              href={`/product/${encodeURIComponent(
                animateProducts[currentIndex].slug.current
              )}`}
            >
              <a className='link'>Learn More</a>
            </Link>
          </div>
        </div>

        <div className='md:h-[500px] md:w-[600px]'>
          <ReactImageGallery
            onBeforeSlide={(currentIndex) => setCurrentIndex(currentIndex)}
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
