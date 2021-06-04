import algoliasearch from 'algoliasearch';
import sanityClient from '@sanity/client';
import { config } from '@lib/sanity';
import indexer from 'sanity-algolia';

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

const sanity = sanityClient({
  ...config,
  token: process.env.SANITY_API_TOKEN
});

const index = algolia.initIndex('matchbox-v2');

export default function handler(req, res) {
  console.log(req);
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400);
    res.json({ message: 'Bad request' });
    return;
  }

  const sanityAlgolia = indexer(
    {
      component: {
        index,
        projection: `{
                    title,
                    subtitle,
                    "path": slug.current
                }`
      }
    },
    (document) => {
      switch (document._type) {
        case 'component':
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
