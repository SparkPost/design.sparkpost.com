import { groq } from 'next-sanity';
import { getClient } from '@lib/sanity';

export async function getHomePage(preview) {
  const query = groq`
        *[_type == "homePage"] | order(_updatedAt desc)[0] {
            title,
            body
        }
    `;

  const data = await getClient(preview).fetch(query);

  return {
    data,
    query
  };
}

export async function getPage(slug, preview) {
  const slugString = JSON.stringify(`/${slug.join('/')}`);

  const query = groq`
        *[_type in ["page", "foundations"] && slug.current == ${slugString}][0] {
            title,
            "slug": slug.current,
            body
        }
    `;

  const data = await getClient(preview).fetch(query);

  return {
    data,
    query
  };
}

export async function getAllPageSlugs() {
  const query = groq`
        *[_type in ["page", "foundations"] && defined(slug.current)][].slug.current
    `;

  const data = await getClient().fetch(query);

  return {
    data,
    query
  };
}
