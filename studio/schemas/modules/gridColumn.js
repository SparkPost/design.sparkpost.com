import React from 'react';
import { Avatar } from '@sanity/ui';

export default {
  title: 'Column',
  name: 'gridColumn',
  type: 'object',
  fields: [
    {
      itle: 'Content',
      name: 'content',
      type: 'blockContent'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Column',
        subtitle: 'The Column contents',
        media: <Avatar initials="SM" size={1} />
      };
    }
  }
};
