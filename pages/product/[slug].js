import Head from 'next/head'
import Header from './../../components/Header'
import { client } from '../../lib/client'
const ProductPage = ({ product }) => {
  return (
    <>
      <Head>
        {/* <title>{product.metaTitle}</title> */}
        {/* добавить все метатайтлы в сайнити */}
      </Head>
      <Header />
    </>
  )
}

export default ProductPage

export async function getStaticPaths() {
  const query = `*[_type == "product" ] {
    slug {
        current
    }
  }`

  const product = await client.fetch(query)
  const paths = product.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`

  const product = await client.fetch(query)

  return {
    props: {
      product,
    },
  }
}
