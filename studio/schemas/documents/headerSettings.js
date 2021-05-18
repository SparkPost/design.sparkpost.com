export default {
  title: 'Header Settings',
  name: 'headerSettings',
  type: 'document',
  fields: [
    {
      title: 'Header Menu',
      name: 'headerMenu',
      type: 'reference',
      to: [{ type: 'menu' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Header Settings'
      };
    }
  }
};
