import { groq } from 'next-sanity';
import { getClient } from '@lib/sanity';

export const PAGE_TYPES = `['page', 'foundation', 'component', 'content', 'pattern', 'brand', 'resource', 'update']`;

export const modules = groq`
  _type == 'grid' => {
    _type,
    _key,
    size,
    columns[] {
      span,
      "url": link->slug.current,
      content
    }
  }
`;

const header = groq`
  "header": *[_type == "headerSettings"][0] {
    "menu": headerMenu -> {
      items[] {
        title,
        "url": page->slug.current,
      }
    }
  }
`;

const footer = groq`
  "footer": *[_type == "footerSettings"][0] {
    "menu": footerMenu -> {
      items[]{
        title,
        url
      }
    }
  }
`;

export async function getHomePage(preview) {
  const query = groq`
    *[_type == "homePage"] | order(_updatedAt desc)[0] {
      ${header},
      ${footer},
      hero {
        title,
        description
      },
      modules[] {
        ${modules}
      }
    }
    `;

  const data = await getClient(preview).fetch(query);

  return {
    data,
    query
  };
}

export async function getPage(slug: string, preview: boolean) {
  const query = groq`
        *[_type in ${PAGE_TYPES} && slug.current match '${slug}'][0] {
            title,
            "slug": slug.current,
            body,
            ${footer},
            ${header},
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
        *[_type in ${PAGE_TYPES} && defined(slug.current)][].slug.current
    `;

  const data = await getClient().fetch(query);

  return {
    data,
    query
  };
}

type IndexTypes =
  | 'foundation'
  | 'component'
  | 'content'
  | 'pattern'
  | 'brand'
  | 'resource'
  | 'update';

export async function getPagesByType(type: IndexTypes) {
  const query = groq`
    *[_type == '${type}'] {
      title,
      "slug": slug.current,
      body
    } | order(title asc)
  `;

  const data = await getClient().fetch(query);

  return {
    data,
    query
  };
}

export async function getIndexPageFor(type: IndexTypes) {
  const query = groq`
        *[0] {
          "list": *[_type == '${type}'] {
            title,
            "slug": slug.current,
            subcategory
          } | order(title asc),
          "settings": *[_type=='indexPage' && (slug.current match '/${type}*' || slug.current match '/${type}')][0] {
            title,
            layout,
            enableSidebar
          },
          ${header},
          ${footer},
        }
    `;

  const data = await getClient().fetch(query);

  return {
    data,
    query
  };
}
