import Head from 'next/head'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../redux/basketSlice'

const Checkout = () => {
  const items = useSelector(selectBasketItems)
  return (
    <div>
      <Head>
        <title>Bag - Room4mommy</title>
      </Head>

      <Header />
      <main>
        <div>
          <h1>{items.lenght > 0 ? 'Review your bag' : 'Your bag is empt'}</h1>
        </div>
      </main>
    </div>
  )
}

export default Checkout
