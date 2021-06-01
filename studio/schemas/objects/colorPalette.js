import { ColorLens } from '@sparkpost/matchbox-icons';

export default {
  name: 'colorPalette',
  title: 'Color Palette',
  type: 'object',
  icon: ColorLens,
  fields: [
    {
      name: 'group',
      title: 'Color Group',
      type: 'string',
      options: {
        // TODO: Pull these from @sparkpost/design-tokens so they're not hard coded
        list: [
          { title: 'Gray', value: 'Gray' },
          { title: 'Blue', value: 'Blue' },
          { title: 'Teal', value: 'Teal' },
          { title: 'Green', value: 'Green' },
          { title: 'Yellow', value: 'Yellow' },
          { title: 'Magenta', value: 'Magenta' },
          { title: 'Purple', value: 'Purple' },
          { title: 'Brand', value: 'Brand' }
        ]
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Optional'
    }
  ]
};
