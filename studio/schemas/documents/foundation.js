import { AccountBalance } from '@sparkpost/matchbox-icons';
import getPageFields from './pageFields';

export default {
  name: 'foundation',
  title: 'Foundations',
  type: 'document',
  icon: AccountBalance,
  fields: [...getPageFields('foundations')],
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
