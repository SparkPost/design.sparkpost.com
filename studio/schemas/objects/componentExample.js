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
      type: 'string',
      required: true
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      required: true
    },
    {
      name: 'code',
      title: 'Example Code',
      type: 'code',
      required: true
    },
    {
      name: 'disableIframe',
      title: 'Disable Iframe',
      type: 'boolean',
      description: 'Disable iframes for overlay components'
    }
  ]
};
