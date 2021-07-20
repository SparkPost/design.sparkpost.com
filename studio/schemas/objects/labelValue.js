export default {
  title: 'Label Value',
  name: 'labelValue',
  type: 'object',
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string'
    },
    {
      title: 'Value',
      name: 'value',
      type: 'string'
    },
    {
      title: 'Copy To Clipboard',
      name: 'copy',
      type: 'boolean',
      description: 'Allow the user to copy the value to their clipboard?'
    }
  ]
};
