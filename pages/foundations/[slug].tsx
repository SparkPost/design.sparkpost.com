import { usePreviewSubscription, PortableText } from '@lib/sanity';
import { getPage, getPagesByType } from '@lib/api';
import { Header } from '@components/header';
import Footer from '@components/footer';
import PageHero from '@components/pageHero';
import { Sidebar } from '@components/sidebar';
import { Box } from '@sparkpost/matchbox';

const Page = ({ data, slug, preview }) => {
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: { slug: slug },
    initialData: data?.pageData,
    enabled: preview
  });

  if (!pageData) {
    return <div>Error</div>;
  }

  const { title, subtitle, body, footer, header, list } = pageData;

  return (
    <div>
      <Header title="Matchbox" items={header?.menu?.items} />
      <Box display="grid" gridTemplateColumns="197px 1fr">
        <Sidebar enabled items={list} root="Foundations" />
        <div>
          <PageHero title={title} subtitle={subtitle}></PageHero>
          <Box border="thick">
            <Box maxWidth="1200" m="0 auto" py="800" px="400">
              <PortableText blocks={body || []} />
            </Box>
          </Box>
        </div>
      </Box>

      <Footer items={footer?.menu?.items} />
    </div>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const { slug = '' } = params;

  const { data: pageData, query } = await getPage(`foundations/${slug}`, 'foundation', preview);

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
  const { data: pages } = await getPagesByType('foundation');

  const paths = pages.map(({ slug }) => ({
    params: { slug: slug.split('/').pop() }
  }));

  return {
    paths,
    fallback: false
  };
}

export default Page;
