import React from 'react';
import { Avatar } from '@sanity/ui';

export default {
  title: 'Column',
  name: 'gridColumn',
  type: 'object',
  fields: [
    {
      name: 'span',
      title: 'Span',
      type: 'number',
      options: {
        list: [
          { title: '1', value: 1 },
          { title: '2', value: 2 },
          { title: '3', value: 3 },
          { title: '4', value: 4 },
          { title: '5', value: 5 },
          { title: '6', value: 6 },
          { title: '7', value: 7 },
          { title: '8', value: 8 },
          { title: '9', value: 9 },
          { title: '10', value: 10 },
          { title: '11', value: 11 },
          { title: '12', value: 12 }
        ]
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'mobileSpan',
      title: 'Mobile Span',
      type: 'number',
      description: 'Optional column span for mobile and smaller screens',
      options: {
        list: [
          { title: '1', value: 1 },
          { title: '2', value: 2 },
          { title: '3', value: 3 },
          { title: '4', value: 4 },
          { title: '5', value: 5 },
          { title: '6', value: 6 },
          { title: '7', value: 7 },
          { title: '8', value: 8 },
          { title: '9', value: 9 },
          { title: '10', value: 10 },
          { title: '11', value: 11 },
          { title: '12', value: 12 }
        ]
      }
    },
    {
      title: 'Link',
      name: 'link',
      type: 'reference',
      to: [
        { type: 'homePage' },
        { type: 'page' },
        { type: 'component' },
        { type: 'foundation' },
        { type: 'content' },
        { type: 'pattern' },
        { type: 'resource' },
        { type: 'brand' },
        { type: 'update' }
      ]
    },
    {
      title: 'Content',
      name: 'content',
      type: 'blockContent'
    },
    {
      title: 'Enable Category Label',
      name: 'enableCategoryLabel',
      type: 'boolean',
      description: 'Turns on the category label based on url'
    }
  ],
  preview: {
    select: {
      excerpt: 'content.0.children.0.text'
    },
    prepare({ excerpt }) {
      return {
        title: 'Column',
        subtitle: excerpt,
        media: <Avatar initials="SM" size={1} />
      };
    }
  }
};
