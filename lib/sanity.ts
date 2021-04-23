import {
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
  createCurrentUserHook
} from 'next-sanity';

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production'
};

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const sanityClient = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  withCredentials: true
});

export const getClient = (usePreview) => (usePreview ? previewClient : sanityClient);

export const useCurrentUser = createCurrentUserHook(config);
