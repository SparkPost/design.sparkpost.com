import { OpenInNew, Link } from '@sparkpost/matchbox-icons';

export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' }
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'Internal Link',
            name: 'internalLink',
            type: 'object',
            blockEditor: {
              icon: Link
            },
            fields: [
              {
                title: 'To',
                name: 'to',
                type: 'reference',
                weak: true,
                to: [
                  { type: 'page' },
                  { type: 'indexPage' },
                  { type: 'component' },
                  { type: 'foundation' },
                  { type: 'pattern' },
                  { type: 'content' },
                  { type: 'brand' },
                  { type: 'resource' },
                  { type: 'update' }
                ]
              }
            ]
          },
          {
            title: 'External Link',
            name: 'externalLink',
            type: 'object',
            blockEditor: {
              icon: OpenInNew
            },
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              }
            ]
          }
        ]
      }
    },
    {
      type: 'image',
      options: { hotspot: true }
    },
    { type: 'horizontalRule' },
    { type: 'code' },
    { type: 'color' },
    { type: 'prop' },
    { type: 'componentExample' }
  ]
};
