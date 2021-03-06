import { usePreviewSubscription, PortableText } from '@lib/sanity';
import { getPage, getPagesByType } from '@lib/api';
import { Header } from '@components/header';
import Footer from '@components/footer';
import PageHero from '@components/pageHero';
import { Sidebar } from '@components/sidebar';
import { SEO } from '@components/seo';
import { Box } from '@sparkpost/matchbox';
import useSeo from '@hooks/useSeo';
import { PageTransition } from '@components/pageTransition';

const Page = ({ data, slug, preview }) => {
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: { slug: slug },
    initialData: data?.pageData,
    enabled: preview
  });

  const { site, title, subtitle, updated_at, body, list, seo } = pageData;

  const { getSeoProps } = useSeo({
    site: site?.seo,
    page: seo,
    pageTitle: title
  });

  if (!pageData) {
    return <div>Error</div>;
  }

  return (
    <div>
      <SEO {...getSeoProps()} />
      <Header title="Matchbox" items={site?.header?.menu?.items} />
      <Box display="grid" gridTemplateColumns={['1fr', null, '197px 1fr']}>
        <Sidebar enabled items={list} activePage={title} root="Updates" />
        <PageTransition>
          <div>
            <PageHero title={title} subtitle={subtitle} updatedAt={updated_at} enableCategory />
            <Box border="thick">
              <Box
                maxWidth="1200"
                width="100vw"
                ml={['-2px', null, 'auto']}
                mr={['-2px', null, 'auto']}
                py="800"
                px="400"
              >
                <PortableText blocks={body || []} />
              </Box>
            </Box>
          </div>
        </PageTransition>
      </Box>

      <Footer items={site?.footer?.menu?.items} />
    </div>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const { slug = '' } = params;

  const { data: pageData, query } = await getPage(`updates/${slug}`, 'update', preview);

  return {
    props: {
      preview,
      data: {
        pageData,
        query
      },
      slug
    },
    revalidate: 10
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
