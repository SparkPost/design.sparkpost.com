const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET; // Copy the string you used for SANITY_PREVIEW_SECRET
const projectUrl =
  process.env.SANITY_STUDIO_ENV === 'production'
    ? 'https://sparkpost-matchbox-v2.netlify.app'
    : 'http://localhost:3000';

export default function resolveProductionUrl(document) {
  return `${projectUrl}/api/preview?secret=${previewSecret}&type=${document._type}&slug=${document.slug.current}`;
}
