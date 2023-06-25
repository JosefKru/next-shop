import Head from 'next/head'
import Footer from '../../components/Footer'

function MainLayout({ metaTitle, children }) {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
      </Head>

      <main>{children}</main>

      <Footer />
    </>
  )
}

export default MainLayout
