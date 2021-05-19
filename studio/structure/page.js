import S from '@sanity/desk-tool/structure-builder';
import { IFramePreview } from '../components/previews';
import {
  Home,
  Visibility,
  AccountBalance,
  Code,
  FactCheck,
  LocalFireDepartment,
  Assignment,
  LibraryBooks,
  Update
} from '@sparkpost/matchbox-icons';
import { Edit } from '@sparkpost/matchbox-icons';
import { isLocalhost } from '../lib/helpers';

// const SCHEMA_TYPE = 'page';

// Web preview configuration
const remoteURL = 'https://sparkpost-matchbox-v2.netlify.app';
const localURL = 'http://localhost:3000';
const previewUrl = isLocalhost() ? localURL : remoteURL;

const pageTypes = [
  {
    title: 'Index Pages',
    type: 'indexPage'
  },
  {
    title: 'Foundations',
    type: 'foundation',
    icon: AccountBalance
  },
  {
    title: 'Components',
    type: 'component',
    icon: Code
  },
  {
    title: 'Content',
    type: 'content',
    icon: LibraryBooks
  },
  {
    title: 'Patterns',
    type: 'pattern',
    icon: FactCheck
  },
  {
    title: 'Brand',
    type: 'brand',
    icon: LocalFireDepartment
  },
  {
    title: 'Resources',
    type: 'resource',
    icon: Assignment
  },
  {
    title: 'Updates',
    type: 'update',
    icon: Update
  }
];

const allPages = pageTypes.map((page) => {
  return S.listItem()
    .title(page.title)
    .schemaType(page.type)
    .icon(page.icon)
    .child(
      S.documentTypeList(page.type)
        .title(page.title)
        .child((documentId) =>
          S.document()
            .documentId(documentId)
            .schemaType(page.type)
            .views([
              S.view.form().icon(Edit),
              S.view
                .component(IFramePreview)
                .options({ previewUrl })
                .icon(Visibility)
                .title('Live Preview')
            ])
        )
    );
});

const pages = [
  S.listItem()
    .title('Home')
    .child(
      S.document()
        .title('Home Page')
        .id('homePage')
        .documentId('homePage')
        .schemaType('homePage')
        .views([
          S.view.form().icon(Edit),
          S.view
            .component(IFramePreview)
            .options({ previewUrl })
            .icon(Visibility)
            .title('Live Preview')
        ])
    )
    .icon(Home),
  S.divider(),
  ...allPages
];

export default pages;
