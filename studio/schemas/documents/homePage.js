import { Home } from '@sparkpost/matchbox-icons';
import { slugWithType } from '../../lib/helpers';

export default {
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: Home,
  fields: [
    {
      name: 'hero',
      title: 'Hero',
      type: 'homeHero'
    },
    slugWithType('', 'title'),
    {
      name: 'modules',
      title: 'Page Modules',
      type: 'array',
      of: [{ type: 'grid' }]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page'
      };
    }
  }
};
