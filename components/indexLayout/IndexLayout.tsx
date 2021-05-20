import React from 'react';
import { Header } from '@components/header';
import Footer from '@components/footer';
import PageHero from '@components/pageHero';
import { IndexList } from '@components/indexList';
import { Sidebar } from '@components/sidebar';
import { Box } from '@sparkpost/matchbox';

type ListProps = {
  title: string;
  slug: string;
  subcategory?: string;
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
};

function IndexLayout(props: IndexLayoutProps): JSX.Element {
  const {
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
