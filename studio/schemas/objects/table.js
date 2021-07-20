import { TableView } from '@sparkpost/matchbox-icons';

export default {
  name: 'table',
  title: 'Table',
  type: 'object',
  description: 'A table with portable content',
  icon: TableView,
  fields: [
    {
      title: 'Rows',
      name: 'rows',
      type: 'array',
      of: [{ type: 'tableRow' }]
    }
  ],
  preview: {
    select: {
      rows: 'rows'
    },
    prepare({ rows }) {
      return { title: `Table`, subtitle: `${rows.length} row${rows.length === 1 ? '' : 's'}` };
    }
  }
};
