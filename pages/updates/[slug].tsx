import { usePreviewSubscription, PortableText } from '@lib/sanity';
import { getPage, getPagesByType } from '@lib/api';

import { Header } from '@components/header';
import Footer from '@components/footer';

const Page = ({ data, slug, preview }) => {
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: { slug: slug },
    initialData: data?.pageData,
    enabled: preview
  });

  if (!pageData) {
    return <div>Error</div>;
  }

  const { title, body, footer, header } = pageData;

  return (
    <div>
      <Header title="Matchbox" items={header?.menu?.items} />
      <h1>{title}</h1>
      <PortableText blocks={body || []} />
      <Footer items={footer?.menu?.items} />
    </div>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const { slug = '' } = params;

  const { data: pageData, query } = await getPage(`updates/${slug}`, preview);

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
  const { data: pages } = await getPagesByType('update');

  const paths = pages.map(({ slug }) => ({
    params: { slug: slug.split('/').pop() }
  }));

  return {
    paths,
    fallback: false
  };
}

export default Page;
