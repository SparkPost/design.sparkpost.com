import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'w7rshig9',
  dataset: 'production',
  apiVersion: '2021-03-25',
  useCdn: true
});
