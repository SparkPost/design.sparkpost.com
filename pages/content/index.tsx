import React from 'react';
import { getIndexPageFor } from '@lib/api';
import { Header } from '@components/header';
import Footer from '@components/footer';
import PageHero from '@components/pageHero';
import { IndexLayout } from '@components/indexLayout';
import { Sidebar } from '@components/sidebar';
import { Box } from '@sparkpost/matchbox';

// TODO Abstract this component so we dont need to repeat on each index page
function FoundationsIndexPage({ data }) {
  const { header, footer, settings, list } = data.pageData;

  return (
    <div>
      <Header title="Matchbox" items={header?.menu?.items} />
      <Box display="grid" gridTemplateColumns={settings.enableSidebar ? '197px 1fr' : '1fr'}>
        <Sidebar enabled={settings.enableSidebar} items={list} root={settings.title} />
        <div>
          <PageHero title={settings.title}></PageHero>
          <IndexLayout layout={settings.layout} items={list} />
        </div>
      </Box>
      <Footer items={footer?.menu?.items} />
    </div>
  );
}

export default FoundationsIndexPage;

export async function getStaticProps({ preview = false }) {
  const { data: pageData, query } = await getIndexPageFor('content');

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
