import { FileDownload } from '@sparkpost/matchbox-icons';

export default {
  title: 'Resource Download',
  name: 'resourceDownload',
  type: 'object',
  icon: FileDownload,
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'Optional title.',
      type: 'string'
    },
    {
      name: 'displayImage',
      title: 'Display Image',
      description: 'Optional image to represent the resource being downloaded',
      type: 'image'
    },
    {
      name: 'darkBackground',
      title: 'Dark Background',
      description: 'Defaults to light, enable dark background for lighter colored resources',
      type: 'boolean'
    },
    {
      name: 'resources',
      title: 'Resources',
      description: 'The resources to be downloaded',
      required: true,
      type: 'array',
      of: [
        { type: 'image', options: { storeOriginalFilename: true } },
        { type: 'file', options: { storeOriginalFilename: true } }
      ]
    }
  ]
};
