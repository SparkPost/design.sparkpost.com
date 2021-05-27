import React from 'react';
import { Header } from '@components/header';
import Footer from '@components/footer';
import PageHero from '@components/pageHero';
import { IndexList } from '@components/indexList';
import { Sidebar } from '@components/sidebar';
import { SEO } from '@components/seo';
import { Box } from '@sparkpost/matchbox';

type ListProps = {
  title: string;
  slug: string;
  subcategory?: string;
};

type SEOProps = {
  title: string;
  description: string;
  keywords: string;
  image: object;
};

type IndexLayoutProps = {
  headerList: ListProps[];
  sidebarList: ListProps[];
  list: ListProps[];
  footerList: ListProps[];
  enableSidebar: boolean;
  layoutType: 'oneColumn' | 'multiColumn';
  title: string;
  subtitle: string;
  seo: SEOProps;
};

function IndexLayout(props: IndexLayoutProps): JSX.Element {
  const {
    seo,
    headerList,
    enableSidebar,
    sidebarList,
    layoutType,
    list,
    footerList,
    title,
    subtitle
  } = props;

  return (
    <div>
      <SEO
        title={seo?.title}
        description={seo?.description}
        keywords={seo?.keywords}
        image={seo?.image}
      />
      <Header title="Matchbox" items={headerList} />
      <Box display="grid" gridTemplateColumns={enableSidebar ? '197px 1fr' : '1fr'}>
        <Sidebar enabled={enableSidebar} items={sidebarList} root={title} />
        <div>
          <PageHero title={title} subtitle={subtitle}></PageHero>
          <IndexList layout={layoutType} items={list} />
        </div>
      </Box>
      <Footer items={footerList} />
    </div>
  );
}

export default IndexLayout;
