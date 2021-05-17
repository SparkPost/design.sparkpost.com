import { Menu } from '@sparkpost/matchbox-icons';

export default {
  title: 'Menu',
  name: 'menu',
  type: 'document',
  icon: Menu,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'required',
      options: {
        source: 'title',
        maxLength: 30
      }
    },
    {
      title: 'Nav Items',
      name: 'items',
      type: 'array',
      of: [{ type: 'navPage' }, { type: 'navLink' }]
    }
  ]
};
