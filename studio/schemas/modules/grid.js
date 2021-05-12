import { GridOn } from '@sparkpost/matchbox-icons';

export default {
  title: 'Grid',
  name: 'grid',
  type: 'object',
  icon: GridOn,
  fields: [
    {
      name: 'note',
      type: 'note',
      options: {
        message: 'It is recommended to use a 10 column grid'
      }
    },
    {
      title: 'Grid Size',
      name: 'size',
      type: 'number',
      options: {
        list: [
          { title: '1', value: 1 },
          { title: '2', value: 2 },
          { title: '3', value: 3 },
          { title: '4', value: 4 },
          { title: '5', value: 5 },
          { title: '6', value: 6 },
          { title: '7', value: 7 },
          { title: '8', value: 8 },
          { title: '9', value: 9 },
          { title: '10', value: 10 },
          { title: '11', value: 11 },
          { title: '12', value: 12 }
        ]
      },
      validation: (Rule) => Rule.required()
    },
    {
      title: 'Columns',
      name: 'columns',
      type: 'array',
      of: [{ type: 'gridColumn' }]
    }
  ],
  preview: {
    select: {
      columns: 'columns'
    },
    prepare({ columns }) {
      const sectionTitle = columns[0]?.content[0]?.children[0]?.text;

      const getTitle = () => {
        if (columns?.length) {
          return `
            ${columns.length} Column${columns.length > 1 ? 's' : ''} ${
            sectionTitle ? `(${sectionTitle})` : ''
          }
          `;
        }

        return 'No Columns';
      };
      return {
        title: getTitle()
      };
    }
  }
};
