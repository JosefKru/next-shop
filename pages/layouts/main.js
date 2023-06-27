import Head from 'next/head'
import Footer from '../../components/Footer'

function MainLayout({ metaTitle, categories, children }) {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
      </Head>

      <main>{children}</main>

      <Footer categories={categories} />
    </>
  )
}

export default MainLayout
