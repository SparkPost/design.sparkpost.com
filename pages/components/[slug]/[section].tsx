import { usePreviewSubscription, PortableText } from '@lib/sanity';
import { getPage, getPagesByType } from '@lib/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header } from '@components/header';
import Footer from '@components/footer';
import PageHero from '@components/pageHero';
import { Sidebar } from '@components/sidebar';
import { SEO } from '@components/seo';
import { Box } from '@sparkpost/matchbox';
import styled from 'styled-components';
import css from '@styled-system/css';
import useSeo from '@hooks/useSeo';

const Tab = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  ${css({
    mr: '-2px;',
    px: '500',
    border: 'thick',
    height: '3.25rem',
    color: 'scheme.fg'
  })}

  &:hover {
    ${css({
      bg: 'scheme.lightAccent',
      color: 'scheme.fg'
    })}
  }

  ${({ isActive, theme }) => {
    if (isActive) {
      return `
      background: ${theme.colors.scheme.lightAccent};
      `;
    }
  }}
`;

const Page = ({ data, slug, preview }) => {
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: { slug: slug },
    initialData: data?.pageData,
    enabled: preview
  });

  const { asPath } = useRouter();
  const pathWithoutHash = asPath.split('#').shift();

  const { site, title, subtitle, list, seo, updated_at } = pageData;
  const pathParts = pathWithoutHash.split('/');
  const activeSection = pathParts.pop();
  const basePath = pathParts.join('/');
  const shouldHaveTabs = pageData.usage || pageData.style;

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
        <Sidebar enabled items={list} activePage={title} root="Components" />
        <div>
          <PageHero title={title} subtitle={subtitle} updatedAt={updated_at} enableCategory />
          {shouldHaveTabs && (
            <Box
              maxWidth="1200"
              m="-3.25rem auto -2px"
              ml={['-2px', null, 'auto']}
              mr={['-2px', null, 'auto']}
              px="400"
              textAlign="left"
            >
              <Link href={`${basePath}/api`}>
                <Tab isActive={pathWithoutHash === `${basePath}/api`}>API</Tab>
              </Link>

              {pageData.usage && (
                <Link href={`${basePath}/usage`}>
                  <Tab isActive={pathWithoutHash === `${basePath}/usage`}>Usage</Tab>
                </Link>
              )}
              {pageData.style && (
                <Link href={`${basePath}/style`}>
                  <Tab isActive={pathWithoutHash === `${basePath}/style`}>Style</Tab>
                </Link>
              )}
            </Box>
          )}
          <Box border="thick">
            <Box
              maxWidth="1200"
              width="100vw"
              m="0 auto"
              ml={['-2px', null, 'auto']}
              mr={['-2px', null, 'auto']}
              py="800"
              px="400"
            >
              <PortableText blocks={pageData[activeSection] || []} />
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
  const { data: pageData, query } = await getPage(`components/${slug}`, 'component', preview);

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
  const { data: pages } = await getPagesByType('component');

  // Creates all possible path combinations, with tabbed routes
  const paths = pages
    .map(({ slug }) => {
      const parts = slug.split('/');
      const paramSlug = parts.pop();
      return { params: { slug: paramSlug } };
    })
    .reduce((acc: object[], { params: { slug } }) => {
      return [
        ...acc,
        { params: { slug, section: 'api' } },
        { params: { slug, section: 'usage' } },
        { params: { slug, section: 'style' } }
      ];
    }, []);

  return {
    paths,
    fallback: false
  };
}

export default Page;
