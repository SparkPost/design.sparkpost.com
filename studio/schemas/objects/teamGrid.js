export default {
  title: 'Team Grid',
  name: 'teamGrid',
  type: 'object',
  description: 'A grid of team members',
  fields: [
    {
      title: 'Members',
      name: 'members',
      type: 'array',
      of: [{ type: 'teamMember' }]
    }
  ],
  preview: {
    select: {
      members: 'members'
    },
    prepare({ members }) {
      console.log(members);
      return {
        title: 'Team Members'
      };
    }
  }
};
