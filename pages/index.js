import Head from 'next/head'
import Header from '../components/Header'
import Landing from './../components/Landing'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Room 4 mommy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative h-[200vh] bg-[#f0f7fd]">
        <Landing />
      </main>
    </div>
  )
}
