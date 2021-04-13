import { Category } from '@sparkpost/matchbox-icons';

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: Category,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
};
