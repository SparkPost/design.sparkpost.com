import { LabelOutline } from '@sparkpost/matchbox-icons';

export default {
  name: 'systemProps',
  title: 'System Props',
  type: 'object',
  description: 'Settings for component system props',
  icon: LabelOutline,
  options: {
    collapsible: true,
    collapsed: true
  },
  fields: [
    {
      name: 'keys',
      title: 'System Prop Keys',
      type: 'string',
      description: 'Comma-delimit system prop keys.'
    }
  ],
  preview: {
    select: {
      title: 'keys'
    }
  }
};
