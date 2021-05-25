import { usePreviewSubscription, PortableText } from '@lib/sanity';
import { getPage, getPagesByType } from '@lib/api';
import { Header } from '@components/header';
import Footer from '@components/footer';
import PageHero from '@components/pageHero';
import { Sidebar } from '@components/sidebar';
import { SEO } from '@components/seo';
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

  const { site, title, subtitle, body, list } = pageData;

  return (
    <div>
      <SEO
        title={site?.seo?.metaTitle}
        description={site?.seo?.metaDescription}
        keywords={site?.seo?.metaKeywords}
        image={site?.seo?.metaImage}
      />
      <Header title="Matchbox" items={site?.header?.menu?.items} />
      <Box display="grid" gridTemplateColumns="197px 1fr">
        <Sidebar enabled items={list} root="Content" />
        <div>
          <PageHero title={title} subtitle={subtitle}></PageHero>
          <Box border="thick">
            <Box maxWidth="1200" m="0 auto" py="800" px="400">
              <PortableText blocks={body || []} />
            </Box>
          </Box>
        </div>
      </Box>

      <Footer items={site?.footer?.menu?.items} />
    </div>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const { slug = '' } = params;

  const { data: pageData, query } = await getPage(`content/${slug}`, 'content', preview);

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
  const { data: pages } = await getPagesByType('content');

  const paths = pages.map(({ slug }) => ({
    params: { slug: slug.split('/').pop() }
  }));

  return {
    paths,
    fallback: false
  };
}

export default Page;
