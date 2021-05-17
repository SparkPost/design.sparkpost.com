export default {
  title: 'Footer Settings',
  name: 'footerSettings',
  type: 'document',
  fields: [
    {
      title: 'Footer Menu',
      name: 'footerMenu',
      type: 'reference',
      to: [{ type: 'menu' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings'
      };
    }
  }
};
