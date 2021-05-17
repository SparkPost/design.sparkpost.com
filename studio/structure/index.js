import S from '@sanity/desk-tool/structure-builder';
import documentStore from 'part:@sanity/base/datastore/document';
import { map } from 'rxjs/operators';

import { Visibility } from '@sparkpost/matchbox-icons';
import { Edit } from '@sparkpost/matchbox-icons';
import { Settings } from '@sparkpost/matchbox-icons';
import { Menu } from '@sparkpost/matchbox-icons';

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

const Structure = () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Menus')
                .child(S.documentTypeList('menu').title('Menus'))
                .icon(Menu)
            ])
        )
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
