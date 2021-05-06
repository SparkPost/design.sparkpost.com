import { LibraryBooks } from '@sparkpost/matchbox-icons';
import getPageFields from './pageFields';

export default {
  name: 'content',
  title: 'Content',
  type: 'document',
  icon: LibraryBooks,
  fields: [...getPageFields('content')],
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
