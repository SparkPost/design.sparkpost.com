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
      description: 'Make sure you know what you are doing. Contact a UX engineer.',
      options: {
        list: [
          { title: 'Token Reference Table', value: 'token-reference-table' },
          { title: 'Spacing Token Table', value: 'spacing-token-table' },
          { title: 'Elevation Token Table', value: 'elevation-token-table' },
          { title: 'Typography Token Table', value: 'typography-token-table' },
          { title: 'Icon Reference List', value: 'icon-reference-list' },
          { title: 'Matchbox CSS Class List', value: 'matchbox-css-class-list' }
        ]
      }
    }
  ]
};
