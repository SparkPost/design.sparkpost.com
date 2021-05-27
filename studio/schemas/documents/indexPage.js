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
      type: 'string',
      description: 'Title of the page, appears in the page hero'
    },
    slugWithType('', 'title'),
    {
      name: 'subtitle',
      title: 'Subtitle',
      rows: 3,
      type: 'text',
      description: 'Appears below the title in the page hero'
    },
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
    },
    {
      name: 'enableSidebar',
      title: 'Enable Sidebar',
      type: 'boolean',
      description: 'Enable or disable the side navigation bar',
      initialValue: false
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
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
