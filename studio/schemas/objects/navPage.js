export default {
  title: 'Page Link',
  name: 'navPage',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Display Text'
    },
    {
      title: 'Page',
      name: 'page',
      type: 'reference',
      to: [
        { type: 'homePage' },
        { type: 'page' },
        { type: 'component' },
        { type: 'foundation' },
        { type: 'content' },
        { type: 'brand' },
        { type: 'pattern' },
        { type: 'resource' },
        { type: 'update' }
      ]
    }
  ]
};
