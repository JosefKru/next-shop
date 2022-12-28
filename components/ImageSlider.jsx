import Image from 'next/image'
import { useState } from 'react'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
import { GoPrimitiveDot } from 'react-icons/go'
import { urlFor } from '../lib/client'

const ImageSlider = ({ imageGallery, product }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const imageGalleryOfItems = imageGallery.filter(
    (image) => image._id === product._id
  )
  const urlOfSlides = imageGalleryOfItems[0].image.map((obj) => obj.asset.url)

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? urlOfSlides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === urlOfSlides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className='relative h-[100%]'>
      <div
        className='absolute top-[55%] left-[10px] z-10 translate-y-[-50%] cursor-pointer text-5xl text-[#404e65] opacity-30 transition-all duration-500 ease-in hover:opacity-100'
        onClick={goToPrevious}
      >
        <AiOutlineDoubleLeft />
      </div>
      <div
        className='absolute top-[55%] right-[10px] z-10 translate-y-[-50%] cursor-pointer text-5xl text-[#404e65] opacity-30 transition-all duration-500 ease-in hover:opacity-100'
        onClick={goToNext}
      >
        <AiOutlineDoubleRight />
      </div>
      <div className='relative h-[360px] w-[360px] md:h-[555px] md:w-[555px]'>
        <Image
          src={urlFor(imageGalleryOfItems[0].image[currentIndex]).url()}
          layout='fill'
          objectFit='contain'
          alt=''
        />
      </div>
      <div className='flex justify-center'>
        {urlOfSlides.map((_, slideIndex) => (
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
    </div>
  )
}

export default ImageSlider
