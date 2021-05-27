import { Code } from '@sparkpost/matchbox-icons';

export default {
  name: 'prop',
  title: 'Prop',
  type: 'object',
  icon: Code,
  fields: [
    {
      name: 'name',
      title: 'Prop Name',
      type: 'string',
      required: true
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      required: true
    },
    {
      name: 'defaultValue',
      title: 'DefaultValue',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent'
    },
    {
      name: 'required',
      title: 'Required',
      type: 'boolean'
    },
    {
      name: 'deprecated',
      title: 'Deprecated',
      type: 'boolean'
    }
  ]
};
