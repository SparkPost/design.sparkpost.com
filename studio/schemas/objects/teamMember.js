export default {
  title: 'Team Member',
  name: 'teamMember',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Pronouns',
      name: 'pronouns',
      type: 'string'
    },
    {
      title: 'Job Title',
      name: 'jobTitle',
      type: 'string'
    },
    {
      title: 'Metadata',
      name: 'metadata',
      type: 'array',
      of: [{ type: 'labelValue' }]
    }
  ]
};
