import { Layers } from '@sparkpost/matchbox-icons';

export default {
  name: 'hardcodedBlock',
  title: 'Hardcoded Block',
  type: 'object',
  icon: Layers,
  fields: [
    {
      name: 'id',
      title: 'Identifier',
      type: 'string',
      required: true,
      description: 'Make sure you know what you are doing. Contact a UX engineer.'
    }
  ]
};
