import S from '@sanity/desk-tool/structure-builder';
import documentStore from 'part:@sanity/base/datastore/document';
import { map } from 'rxjs/operators';

import { Visibility, Settings, PowerInput } from '@sparkpost/matchbox-icons';
import { Edit } from '@sparkpost/matchbox-icons';
import { Menu } from '@sparkpost/matchbox-icons';
import { PowerInput } from '@sparkpost/matchbox-icons';

import pages from './page';

const REVIEW_QUERY = `* [_type == 'workflow.metadata' && state == 'inReview'] {
  ...coalesce(
    *[_id == "drafts." + ^.documentId]{_id,_type}[0],
    *[_id == ^.documentId]{_id,_type}[0]
  )
}`;

const DRAFTS_QUERY = `* [_type == 'workflow.metadata' && state == 'draft'] {
  ...coalesce(
    *[_id == "drafts." + ^.documentId]{_id,_type}[0],
    *[_id == ^.documentId]{_id,_type}[0]
  )
}`;

const HeaderSettings = S.listItem()
  .title('Header Settings')
  .child(S.editor().id('headerSettings').schemaType('headerSettings').documentId('headerSettings'))
  .icon(PowerInput);

const FooterSettings = S.listItem()
  .title('Footer Settings')
  .child(S.editor().id('footerSettings').schemaType('footerSettings').documentId('footerSettings'))
  .icon(Settings);

const Menus = S.listItem()
  .title('Menus')
  .child(S.documentTypeList('menu').title('Menus'))
  .icon(Menu);

const Structure = () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(S.list().title('Settings').items([Menus, HeaderSettings, FooterSettings]))
        .icon(Settings),
      S.divider(),
      ...pages,
      S.divider(),
      S.listItem()
        .title('In Review')
        .id('review')
        .icon(Visibility)
        .child(() => {
          return documentStore.listenQuery(REVIEW_QUERY).pipe(
            map((docs) => {
              return S.list()
                .title(docs.length ? 'In Review' : 'No Content In Review')
                .id('review')
                .items(
                  docs.map((item) => {
                    return S.documentListItem().id(item._id).schemaType(item._type);
                  })
                );
            })
          );
        }),
      S.divider(),
      S.listItem()
        .title('Drafts')
        .id('drafts')
        .icon(Edit)
        .child(() => {
          return documentStore.listenQuery(DRAFTS_QUERY).pipe(
            map((docs) => {
              return S.list()
                .title(docs.length ? 'Drafts' : 'No Drafts')
                .id('drafts')
                .items(
                  docs.map((item) => {
                    return S.documentListItem().id(item._id).schemaType(item._type);
                  })
                );
            })
          );
        }),
      S.divider()
    ]);

export default Structure;
