import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'w7rshig9',
  dataset: 'production',
  useCdn: true
})