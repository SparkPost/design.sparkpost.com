export default {
  title: 'SEO Settings',
  name: 'seoSettings',
  type: 'document',
  fields: [
    {
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      validation: (Rule) =>
        Rule.max(50).warning(
          'Longer titles may be truncated by search engines and are not recommended.'
        )
    },
    {
      title: 'Meta Description',
      name: 'metaDescription',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by search engines and are not recommended.'
        )
    },
    {
      title: 'Meta Keywords',
      name: 'metaKeywords',
      type: 'text',
      rows: 4,
      description: 'A comma separated list of keywords'
    },
    {
      title: 'Meta Image',
      name: 'metaImage',
      type: 'image',
      description: 'Will be cropped to 1200 x 630'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'SEO Settings'
      };
    }
  }
};
