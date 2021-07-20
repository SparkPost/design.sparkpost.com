export default {
  title: 'Table Cell',
  name: 'tableCell',
  type: 'object',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      excerpt: 'content.0.children.0.text'
    },
    prepare({ excerpt }) {
      console.log(excerpt);
      return {
        title: 'Cell Content',
        subtitle: excerpt
      };
    }
  }
};
