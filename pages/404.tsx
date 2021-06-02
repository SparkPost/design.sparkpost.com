import { Box } from '@sparkpost/matchbox';
import { getHomePage } from '@lib/api';
import { usePreviewSubscription } from '@lib/sanity';
import { Header } from '@components/header';
import Footer from '@components/footer';
import { SEO } from '@components/seo';
import useSeo from '@hooks/useSeo';

function NotFound({ data, preview }) {
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: { documentId: 'homePage' },
    initialData: data?.pageData,
    enabled: preview
  });

  const { site, seo } = pageData;

  const { getSeoProps } = useSeo({
    site: site?.seo,
    page: seo
  });

  if (!pageData) {
    return <div>Error</div>;
  }

  return (
    <Box>
      <SEO {...getSeoProps()} title="404 - Not Found" />
      <Header title="Matchbox" items={site?.header?.menu?.items} />
      <Box display="flex" height="70vh" alignItems="center" justifyContent="center">
        <Box textAlign="center">
          <Box fontSize="800" lineHeight="800">
            404
          </Box>
          <Box fontSize="100" lineHeight="100">
            Not Found
          </Box>
        </Box>
      </Box>
      <Footer items={site?.footer?.menu?.items} />
    </Box>
  );
}

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

export default NotFound;
