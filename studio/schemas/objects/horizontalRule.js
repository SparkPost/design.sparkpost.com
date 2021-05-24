import React from 'react';
import { Maximize } from '@sparkpost/matchbox-icons';

const HR = () => {
  return <hr />;
};

export default {
  title: 'Horizontal Rule',
  name: 'horizontalRule',
  type: 'object',
  icon: Maximize,
  fields: [
    {
      type: 'string',
      name: 'horizontalRule',
      inputComponent: HR
    }
  ]
};
