import { Code } from '@sparkpost/matchbox-icons';

export default {
  name: 'componentExample',
  title: 'Component Example',
  type: 'object',
  icon: Code,
  fields: [
    {
      name: 'name',
      title: 'Example Title',
      type: 'string'
    },
    {
      name: 'code',
      title: 'Example Code',
      type: 'code',
      description: 'Optional'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Optional'
    }
  ]
};
