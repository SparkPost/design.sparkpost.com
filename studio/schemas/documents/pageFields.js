import { slugWithType } from '../../lib/helpers';

const getPageFields = (type = '') => {
  return [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    slugWithType(type, 'title'),
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
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
    }
  ];
};

export default getPageFields;
