import S from '@sanity/desk-tool/structure-builder';
import { IFramePreview } from '../components/previews';
import { Visibility } from '@sparkpost/matchbox-icons';
import { Edit } from '@sparkpost/matchbox-icons';

const SCHEMA_TYPE = 'post';

// Web preview configuration
const remoteURL = 'https://sparkpost-matchbox-v2.netlify.app';
const localURL = 'http://localhost:3000';
const previewUrl = window.location.hostname === 'localhost' ? localURL : remoteURL;

const post = S.listItem()
  .title('Posts')
  .schemaType(SCHEMA_TYPE)
  .child(
    S.documentTypeList(SCHEMA_TYPE)
      .title('Posts')
      .child((documentId) =>
        S.document()
          .documentId(documentId)
          .schemaType(SCHEMA_TYPE)
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

export default post;
