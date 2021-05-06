import { LocalFireDepartment } from '@sparkpost/matchbox-icons';
import getPageFields from './pageFields';

export default {
  name: 'brand',
  title: 'Brand',
  type: 'document',
  icon: LocalFireDepartment,
  fields: [...getPageFields('brand')],
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
