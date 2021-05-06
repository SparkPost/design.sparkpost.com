import { Home } from '@sparkpost/matchbox-icons';
import getPageFields from './pageFields';

export default {
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: Home,
  fields: [...getPageFields()],
  preview: {
    prepare() {
      return {
        title: 'Home Page'
      };
    }
  }
};
