import { FactCheck } from '@sparkpost/matchbox-icons';
import getPageFields from './pageFields';

export default {
  name: 'pattern',
  title: 'Patterns',
  type: 'document',
  icon: FactCheck,
  fields: [...getPageFields('patterns')],
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
