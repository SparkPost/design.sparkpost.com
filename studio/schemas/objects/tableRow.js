export default {
  title: 'Table Row',
  name: 'tableRow',
  type: 'object',
  fields: [
    {
      title: 'Cells',
      name: 'cells',
      type: 'array',
      of: [{ type: 'tableCell' }]
    }
  ],
  preview: {
    select: {
      cells: 'cells'
    },
    prepare({ cells }) {
      return { title: `Row`, subtitle: `${cells.length} columns` };
    }
  }
};
