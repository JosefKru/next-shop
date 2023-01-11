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
        'h-[360px] w-[360px] md:w-[600px] md:h-[600px] cursor-auto',
    }
  })

  return (
    <div className='relative select-none self-start'>
      <ReactImageGallery
        showThumbnails={true}
        thumbnailPosition='bottom'
        slideInterval={5000}
        slideDuration={800}
        showNav={true}
        autoPlay={false}
        items={slidesSetting}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={true}
      />
    </div>
  )
}

export default ImageSlider
