import algoliasearch from 'algoliasearch';
import sanityClient from '@sanity/client';
import { config } from '@lib/sanity';
import indexer from 'sanity-algolia';

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY
);

const sanity = sanityClient({
  ...config,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

const index = algolia.initIndex('matchbox-v2');

export default function handler(req, res) {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400);
    res.json({ message: 'Bad request' });
    return;
  }

  const genericPageProjection = `{
        title,
        subtitle,
        "path": slug.current
    }`;

  const sanityAlgolia = indexer(
    {
      page: { index, projection: genericPageProjection },
      foundation: { index, projection: genericPageProjection },
      component: { index, projection: genericPageProjection },
      content: { index, projection: genericPageProjection },
      pattern: { index, projection: genericPageProjection },
      brand: { index, projection: genericPageProjection },
      resource: { index, projection: genericPageProjection },
      update: { index, projection: genericPageProjection }
    },
    (document) => {
      switch (document._type) {
        case 'page':
        case 'foundation':
        case 'component':
        case 'content':
        case 'pattern':
        case 'brand':
        case 'resource':
        case 'update':
          return {
            title: document.title,
            subtitle: document.subtitle,
            ...document
          };
        default:
          return document;
      }
    }
  );

  return sanityAlgolia.webhookSync(sanity, req.body).then(() => res.status(200).send('ok'));
}
