import { usePreviewSubscription } from '@lib/sanity';
import { getHomePage } from '@lib/api';
import { Box } from '@sparkpost/matchbox';

import { HomeHero } from '@components/homeHero';
import { Card } from '@components/card';
import { Header } from '@components/header';
import Footer from '@components/footer';

const HomePage = ({ data, preview }) => {
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: { documentId: 'homePage' },
    initialData: data?.pageData,
    enabled: preview
  });

  if (!pageData) {
    return <div>Error</div>;
  }

  const { header, hero, modules, footer } = pageData;

  return (
    <div>
      <Header title="Matchbox" items={header?.menu?.items} />
      <HomeHero title={hero?.title} description={hero?.description} />
      <Box border="thick" my="-2px">
        {modules?.map((module, key) => (
          <Box key={key} display="grid" gridTemplateColumns={`repeat(${module.size}, 1fr)`}>
            {module.columns?.map((column, index) => (
              <Card
                key={index}
                index={index}
                span={column.span}
                url={column.url}
                content={column.content}
              />
            ))}
          </Box>
        ))}
      </Box>
      <Footer items={footer?.menu?.items} />
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
