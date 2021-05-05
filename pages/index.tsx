import { usePreviewSubscription, PortableText } from '@lib/sanity';
import { getHomePage, getAllPageSlugs } from '@lib/api';

const Page = ({ data, preview }) => {
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: { documentId: 'homePage' },
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

export async function getStaticProps({ preview = false }) {
  const { data: pageData, query } = await getHomePage(preview);

  return {
    props: {
      preview,
      data: {
        pageData,
        query
      }
    }
  };
}

export async function getStaticPaths() {
  const { data: pages } = await getAllPageSlugs();

  const paths = pages.map((slug) => ({
    params: { slug: slug.split('/').filter((p) => p) }
  }));

  return {
    paths,
    fallback: false
  };
}

export default Page;
