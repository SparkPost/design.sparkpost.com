import { ColorLens } from '@sparkpost/matchbox-icons';
import { meta } from '@sparkpost/design-tokens';

const colorNames = meta
  .filter(({ category }) => category === 'background-color')
  .map(({ javascript }) => javascript);

export default {
  name: 'color',
  title: 'Color',
  type: 'object',
  icon: ColorLens,
  fields: [
    {
      name: 'name',
      title: 'JS Token Name',
      type: 'string',
      description: 'Must be a javascript token name',
      validation: (Rule) => {
        return Rule.required().custom((str) => {
          if (colorNames.includes(str)) {
            return true;
          }
          return 'Provided string is not a javascript token name';
        });
      }
    },
    {
      name: 'label',
      title: 'Additional Label',
      type: 'string',
      description: 'Optional'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Optional'
    }
  ]
};
