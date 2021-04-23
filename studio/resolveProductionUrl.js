import { isLocalhost } from './lib/helpers';

const previewSecret = 'MATCHBOX';
const projectUrl = isLocalhost()
  ? 'http://localhost:3000'
  : 'https://sparkpost-matchbox-v2.netlify.app';

export default function resolveProductionUrl(document) {
  if (!document.slug) {
    return '';
  }

  return `${projectUrl}/api/preview?secret=${previewSecret}&type=${document._type}&slug=${document.slug.current}`;
}
