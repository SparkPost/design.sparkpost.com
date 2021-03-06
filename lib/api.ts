import { groq } from 'next-sanity';
import { getClient } from '@lib/sanity';

type IndexTypes =
  | 'foundation'
  | 'component'
  | 'content'
  | 'pattern'
  | 'brand'
  | 'resource'
  | 'update';

export const PAGE_TYPES = `['page', 'foundation', 'component', 'content', 'pattern', 'brand', 'resource', 'update']`;

const fillMarkDefs = `
markDefs[]{
  ...,
  _type == "internalLink" => {
    "slug": @.to->slug.current
  }
}
`;

export const modules = groq`
  _type == 'grid' => {
    _type,
    _key,
    size,
    columns[] {
      span,
      mobileSpan,
      "slug": link->slug.current,
      content[] {
        ...,
        ${fillMarkDefs}
      },
      enableCategoryLabel
    }
  }
`;

const header = groq`
  "header": *[_type == "headerSettings"][0] {
    "menu": headerMenu -> {
      items[] {
        title,
        "slug": page->slug.current,
      }
    }
  }
`;

const footer = groq`
  "footer": *[_type == "footerSettings"][0] {
    "menu": footerMenu -> {
      items[]{
        title,
        "slug": url
      }
    }
  }
`;

const seo = groq`
  "seo": *[_type == "seoSettings"][0] {
    metaTitle,
    metaDescription,
    metaKeywords,
    metaImage,
    favicon
  }
`;

const site = groq`
  "site": {
    ${seo},
    ${header},
    ${footer},
  }
`;

const fillPropComponentLinks = `
_type == "prop" => {
  ...,
  description[] {
    ...,
   ${fillMarkDefs} 
  }
}
`;

const fillResourceDownloadComponentLinks = `
  _type == "resourceDownload" => {
    ...,
    "url": displayImage.asset->url,
    resources[] {
      ...,
      "url": asset->url,
      "extension": asset->extension,
      "originalFilename": asset->originalFilename
    }
  }
`;

const fillTeamGridLinks = `
  _type == "teamGrid" => {
    ...
  }
`;

const fillComponentExampleLinks = `
_type == "componentExample" => {
  ...,
  description[] {
    ...,
    ${fillMarkDefs} 
  }
}
`;

const fillTableLinks = `
_type == "table" => {
  ...,
  rows[] {
    ...,
    cells[] {
      ...,
      content[] {
        ...,
        ${fillMarkDefs} 
      }
    }
  }
}
`;

export async function getHomePage(preview) {
  const query = groq`
    *[_type == "homePage"] | order(_updatedAt desc)[0] {
      ${site},
      seo,
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

export const getPageSlug = groq`
  *[_type in ${PAGE_TYPES} && slug.current match $slug][0] {
    "slug": slug.current
  }
`;

export async function getPage(slug: string, type: IndexTypes, preview: boolean) {
  const listOrder = type === 'update' ? 'updated_at desc' : 'title asc';
  const query = groq`
        *[_type in ${PAGE_TYPES} && slug.current match '${slug}'][0] {
            ${site},
            seo,
            title,
            subtitle,
            "slug": slug.current,
            "created_at": _createdAt,
            "updated_at": _updatedAt,
            body[] {
              ...,
              ${fillMarkDefs},
              ${fillResourceDownloadComponentLinks},
              ${fillTableLinks},
              ${fillTeamGridLinks},
            },
            api[] {
							...,
              ${fillMarkDefs},
							${fillPropComponentLinks}
            },
            style[] {
              ...,
              ${fillMarkDefs} 
            },
            usage[] {
              ...,
              ${fillMarkDefs},
              ${fillComponentExampleLinks}
            },
            "list": *[_type == '${type}'] {
              title,
              "slug": slug.current,
              subcategory,
              "updated_at": _updatedAt
            } | order(${listOrder}),
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

export async function getPagesByType(type: IndexTypes) {
  const query = groq`
    *[_type == '${type}'] {
      ${site},
      seo,
      title,
      subtitle,
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

export async function getIndexPageFor(type: IndexTypes, { order = 'title asc' } = {}) {
  const query = groq`
        *[0] {
          "list": *[_type == '${type}'] | order(${order}) {
            title,
            "slug": slug.current,
            subcategory,
            subtitle,
            "created_at": _createdAt,
            "updated_at": _updatedAt,
            "excerpt": body
          },
          "settings": *[_type=='indexPage' && (slug.current match '/${type}*' || slug.current match '/${type}')][0] {
            title,
            subtitle,
            layout,
            enableSidebar,
            seo
          },
          ${site},
        }
    `;

  const data = await getClient().fetch(query);

  return {
    data,
    query
  };
}
