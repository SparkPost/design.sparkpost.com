import React from 'react';

import {
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
  createPortableTextComponent
} from 'next-sanity';

import Block from '@componentsPortable/Block';
import Hr from '@componentsPortable/Hr';
import Image from '@componentsPortable/Image';
import CodeBlock from '@componentsPortable/CodeBlock';
import Color from '@componentsPortable/Color';
import ColorPalette from '@componentsPortable/ColorPalette';
import List from '@componentsPortable/List';
import InlineCode from '@componentsPortable/InlineCode';
import { InternalLink, ExternalLink } from '@componentsPortable/Links';
import Prop from '@componentsPortable/Prop';
import ComponentExample from '@componentsPortable/ComponentExample';
import SystemProps from '@componentsPortable/SystemProps';
import HardcodedBlock from '@componentsPortable/HardcodedBlock';
import ResourceDownload from '@componentsPortable/ResourceDownload';
import Table from '@componentsPortable/Table';
import TeamGrid from '@componentsPortable/TeamGrid';

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production'
};

// Creates image urls for Image nodes
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const PortableText = createPortableTextComponent({
  ...config,
  serializers: {
    types: {
      horizontalRule: Hr,
      block: Block,
      code: CodeBlock,
      image: (props: any) => (
        <Image
          alt={props.node.alt}
          caption={props.node.caption}
          source={urlFor(props.node).url()}
        />
      ),
      color: Color,
      colorPalette: ColorPalette,
      prop: Prop,
      componentExample: ComponentExample,
      systemProps: SystemProps,
      hardcodedBlock: HardcodedBlock,
      resourceDownload: ResourceDownload,
      table: Table,
      teamGrid: TeamGrid
    },
    list: List,
    marks: {
      code: InlineCode,
      internalLink: InternalLink,
      externalLink: ExternalLink
    }
  }
});

// This is used for portable text within cards, where we want limited functionality
// Disables header links so we dont get nested <a>s
export const SimplePortableText = createPortableTextComponent({
  ...config,
  serializers: {
    types: {
      block: (props) => <Block {...props} disableLinks />
    },
    list: List,
    marks: {
      code: InlineCode,
      internalLink: InternalLink,
      externalLink: ExternalLink
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
