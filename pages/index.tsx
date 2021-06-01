import { usePreviewSubscription } from '@lib/sanity';
import { getHomePage } from '@lib/api';
import { Box } from '@sparkpost/matchbox';

import { HomeHero } from '@components/homeHero';
import { Card } from '@components/card';
import { Header } from '@components/header';
import Footer from '@components/footer';
import { SEO } from '@components/seo';
import useSeo from '@hooks/useSeo';

const HomePage = ({ data, preview }) => {
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: { documentId: 'homePage' },
    initialData: data?.pageData,
    enabled: preview
  });

  const { site, hero, modules, seo } = pageData;

  const { getSeoProps } = useSeo({
    site: site?.seo,
    page: seo
  });

  if (!pageData) {
    return <div>Error</div>;
  }

  return (
    <div>
      <SEO {...getSeoProps()} />
      <Header title="Matchbox" items={site?.header?.menu?.items} />
      <HomeHero title={hero?.title} description={hero?.description} />
      <Box border="thick" my="-2px">
        {modules?.map((module, key) => {
          return (
            <Box key={key} display="grid" gridTemplateColumns={`repeat(${module.size}, 1fr)`}>
              {module.columns?.map((column: any, index: number) => {
                return (
                  <Card
                    key={index}
                    index={index}
                    span={column.span}
                    url={column.slug}
                    content={column.content}
                    category={column.category}
                  />
                );
              })}
            </Box>
          );
        })}
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
    },
    revalidate: 10
  };
}

export default HomePage;
