import { Assignment } from '@sparkpost/matchbox-icons';
import getPageFields from './pageFields';

export default {
  name: 'resource',
  title: 'Resources',
  type: 'document',
  icon: Assignment,
  fields: [...getPageFields('resources')],
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
