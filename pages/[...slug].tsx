import { usePreviewSubscription, PortableText } from '@lib/sanity';
import { getPage, getAllPageSlugs } from '@lib/api';

const Page = ({ data, slug, preview }) => {
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: { slug: slug },
    initialData: data?.pageData,
    enabled: preview
  });

  if (!pageData) {
    return <div>Error</div>;
  }

  const { title, body } = pageData;

  return (
    <div>
      <h1>{title}</h1>
      <PortableText blocks={body || []} />
    </div>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const { slug = '' } = params;

  const { data: pageData, query } = await getPage(slug, preview);

  return {
    props: {
      preview,
      data: {
        pageData,
        query
      },
      slug
    }
  };
}

export async function getStaticPaths() {
  const { data: pages } = await getAllPageSlugs();

  console.log(pages);

  const paths = pages.map((slug) => ({
    params: { slug: slug.split('/').filter((p) => p) }
  }));

  return {
    paths,
    fallback: false
  };
}

export default Page;
