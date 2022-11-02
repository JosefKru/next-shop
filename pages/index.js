import Head from 'next/head'
import Header from '../components/Header'
import Landing from './../components/Landing'

function Home() {
  return (
    <div>
      <Head>
        <title>Room 4 mommy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative bg-[#f0f7fd]">
        <Landing />
      </main>

      <section className="  bg-gradient-to-b from-[#f0f7fd]">
        <div className="space-y-10 py-16">
          <h1 className="text-center text-4xl font-bold tracking-wide text-[#404e65] md:text-5xl">
            New Promos
          </h1>
        </div>
        <p>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</p>
      </section>
    </div>
  )
}

export default Home
