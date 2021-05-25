import { Code } from '@sparkpost/matchbox-icons';
import getPageFields from './pageFields';

export default {
  name: 'component',
  title: 'Components',
  type: 'document',
  icon: Code,
  fields: [
    ...getPageFields('components'),
    {
      name: 'api',
      title: 'API Documentation',
      type: 'blockContent',
      required: true
    },
    {
      name: 'usage',
      title: 'Usage Documentation',
      type: 'blockContent'
    },
    {
      name: 'style',
      title: 'Style Documentation',
      type: 'blockContent'
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
