import Image from 'next/image'

const Footer = ({ categories }) => {
  return (
    <footer className='lg:mx-20'>
      <div className='flex flex-row justify-around rounded-3xl bg-[#56b0f275] p-14 pt-12'>
        <div className='flex flex-col items-center justify-center'>
          <div className='relative mb-6 h-16 w-32'>
            <Image
              src='/logo2.png'
              layout='fill'
              objectFit='contain'
              alt='Logo'
            />
          </div>
          <div>
            <address>555 California Street, Suite 100, San Francisco</address>
            <div>CA 94107</div>
            <div>
              Phone:
              <a href='tel:1-800-312-2121'> 1-800-312-2121</a>,
              <a href='tel:1-800-310-1010'> 1-800-310-1010</a>
            </div>
            <div>
              Email:
              <a href='mailto:josefkaru@gmail.com'> josefkaru@gmail.com</a>
            </div>
          </div>
        </div>
        <div className='mt-10 hidden w-48 md:block'>
          <p className='font-bold'>Categories</p>
          {categories?.map((category) => (
            <div key={category._id}>{category.title}</div>
          ))}
        </div>
        <div className='mt-10 hidden w-48 md:block'>
          <p className='font-bold'>Newest</p>
          <div>map here</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
