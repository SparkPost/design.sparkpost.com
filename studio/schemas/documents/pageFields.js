import { slugWithType } from '../../lib/helpers';

const getPageFields = (type = '') => {
  return [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the page, appears in the page hero'
    },
    slugWithType(type, 'title'),
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Appears below the title in the page hero',
      rows: 3
    },
    type !== 'components'
      ? {
          name: 'body',
          title: 'Body',
          type: 'blockContent'
        }
      : undefined,
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      description: 'Optional Subcategory to group this page in the side nav'
    },
    {
      name: 'modules',
      title: 'Page Modules',
      type: 'array',
      of: [{ type: 'grid' }]
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    }
  ].filter(Boolean);
};

export default getPageFields;
