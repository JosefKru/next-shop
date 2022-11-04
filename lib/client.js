import sanityClient from '@sanity/client'
import createImageUrlBuilder from '@sanity/image-url'

const config = {
  projectId: '8fnm059y',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token: process.env.SANITY_PUBLIC_TOKEN,
  useCdn: true,
  ignoreBrowserTokenWarning: true,
}

export const client = sanityClient(config)

export const urlFor = (source) => createImageUrlBuilder(config).image(source)
