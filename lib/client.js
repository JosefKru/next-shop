import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const config = {
  projectId: '8fnm059y',
  dataset: 'production',
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: '2021-03-25',
  token: process.env.SANITY_PUBLIC_TOKEN,
  useCdn: true,
  ignoreBrowserTokenWarning: true,
}

export const client = sanityClient(config)

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
