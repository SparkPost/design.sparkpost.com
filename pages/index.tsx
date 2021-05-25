import { usePreviewSubscription } from '@lib/sanity';
import { getHomePage } from '@lib/api';
import { Box } from '@sparkpost/matchbox';

import { HomeHero } from '@components/homeHero';
import { Card } from '@components/card';
import { Header } from '@components/header';
import Footer from '@components/footer';
import { SEO } from '@components/seo';

const HomePage = ({ data, preview }) => {
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: { documentId: 'homePage' },
    initialData: data?.pageData,
    enabled: preview
  });

  if (!pageData) {
    return <div>Error</div>;
  }

  const { site, hero, modules } = pageData;

  return (
    <div>
      <SEO
        title={site?.seo?.metaTitle}
        description={site?.seo?.metaDescription}
        keywords={site?.seo?.metaKeywords}
        image={site?.seo?.metaImage}
      />
      <Header title="Matchbox" items={site?.header?.menu?.items} />
      <HomeHero title={hero?.title} description={hero?.description} />
      <Box border="thick" my="-2px">
        {modules?.map((module, key) => (
          <Box key={key} display="grid" gridTemplateColumns={`repeat(${module.size}, 1fr)`}>
            {module.columns?.map((column, index) => (
              <Card
                key={index}
                index={index}
                span={column.span}
                url={column.slug}
                content={column.content}
              />
            ))}
          </Box>
        ))}
      </Box>
      <Footer items={site?.footer?.menu?.items} />
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
