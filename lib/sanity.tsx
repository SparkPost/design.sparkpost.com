import React from 'react';

import {
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
  createPortableTextComponent
} from 'next-sanity';

import Block from '../componentsPortable/Block';
import Hr from '../componentsPortable/Hr';

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production'
};

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const PortableText = createPortableTextComponent({
  ...config,
  serializers: {
    types: {
      horizontalRule: Hr,
      block: Block,
      image: () => 'test'
    }
  }
});

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const sanityClient = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  withCredentials: true
});

export const getClient = (usePreview = false) => (usePreview ? previewClient : sanityClient);

export const useCurrentUser = createCurrentUserHook(config);
