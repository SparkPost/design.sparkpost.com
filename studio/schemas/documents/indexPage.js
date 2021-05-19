import { InsertDriveFile } from '@sparkpost/matchbox-icons';
import { slugWithType } from '../../lib/helpers';

export default {
  name: 'indexPage',
  title: 'IndexPage',
  type: 'document',
  icon: InsertDriveFile,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    slugWithType('', 'title'),
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      required: true,
      options: {
        list: [
          { title: 'Single Column', value: 'oneColumn' },
          { title: 'Multi Column', value: 'multiColumn' }
        ],
        layout: 'radio'
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug'
    },
    prepare({ title = 'Untitled', slug = {} }) {
      const path = `${slug.current}`;
      return {
        title,
        subtitle: slug.current ? path : 'missing slug'
      };
    }
  }
};