export default function resolveProductionUrl(document) {
    return `http://localhost:3000/post/${document.slug.current}`
}