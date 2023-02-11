import ReactImageGallery from 'react-image-gallery'
import { urlFor } from '../lib/client'

const ImageSlider = ({ imageGallery, product }) => {
  const imageGalleryOfItems = imageGallery.filter(
    (image) => image._id === product._id
  )
  const slidesSetting = imageGalleryOfItems[0].image.map((obj, index) => {
    return {
      original: obj.asset.url,
      thumbnail: urlFor(imageGalleryOfItems[0].image[index]).url(),

      originalClass:
        'h-[350px] w-[100%] md:w-[100%] md:h-[510px] lg:w-[100%] lg:h-[650px]',
    }
  })

  return (
    <div className='h-[450px] w-[300px] md:h-[600px] md:w-[600px] '>
      <ReactImageGallery
        showThumbnails={true}
        thumbnailPosition='bottom'
        slideInterval={5000}
        slideDuration={800}
        showNav={true}
        autoPlay={false}
        items={slidesSetting}
        showFullscreenButton={true}
        showPlayButton={false}
        showBullets={true}
      />
    </div>
  )
}

export default ImageSlider
