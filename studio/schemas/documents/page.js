import { InsertDriveFile } from '@sparkpost/matchbox-icons';
import getPageFields from './pageFields';

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: InsertDriveFile,
  fields: [...getPageFields()],
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
