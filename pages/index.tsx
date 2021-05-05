import { usePreviewSubscription, PortableText } from '@lib/sanity';
import { getHomePage } from '@lib/api';

const HomePage = ({ data, preview }) => {
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

export default HomePage;
