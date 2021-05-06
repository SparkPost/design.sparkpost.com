import { Update } from '@sparkpost/matchbox-icons';
import getPageFields from './pageFields';

export default {
  name: 'update',
  title: 'Updates',
  type: 'document',
  icon: Update,
  fields: [...getPageFields('updates')],
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
