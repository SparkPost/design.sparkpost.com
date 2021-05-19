import React from 'react';
import { getIndexPageFor } from '@lib/api';
import { Header } from '@components/header';
import Footer from '@components/footer';
import PageHero from '@components/pageHero';
import { IndexLayout } from '@components/indexLayout';

function FoundationsIndexPage({ data }) {
  const { header, footer, settings, list } = data.pageData;

  return (
    <div>
      <Header title="Matchbox" items={header?.menu?.items} />
      <PageHero title={settings.title}></PageHero>
      <IndexLayout layout={settings.layout} items={list} />
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
