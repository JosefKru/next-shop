import Image from 'next/image'

const Footer = ({ categories }) => {
  console.log(categories)
  return (
    <div className="flex flex-row justify-around p-14">
      <div className="w-48">
        <div className="relative h-16 w-32">
          <Image src="/logo.svg" layout="fill" objectFit="contain" alt="logo" />
        </div>
        <div className="">555 California str, Suite 100 San Francisco,</div>
        <div>CA 94107 1-800-312-2121 1-800-310-1010</div>
        <div>example@domain.net</div>
      </div>
      <div className="w-48">
        <div>
          <p className="font-bold">Categories</p>
        </div>
        {categories.map((category) => (
          <div key={category._id}>{category.title}</div>
        ))}
      </div>
      <div className="w-48">
        <div>
          <p className="font-bold">Newest</p>
        </div>
        <div>map</div>
      </div>
    </div>
  )
}

export default Footer
