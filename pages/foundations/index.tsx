import React from 'react';
import { getIndexPageFor } from '@lib/api';
import { IndexLayout } from '@components/indexLayout';

function FoundationsIndexPage({ data }) {
  const { header, footer, settings, list } = data.pageData;

  return (
    <IndexLayout
      headerList={header?.menu?.items}
      enableSidebar={settings.enableSidebar}
      sidebarList={list}
      layoutType={settings.layout}
      list={list}
      footerList={footer?.menu?.items}
      title={settings.title}
      subtitle={settings.subtitle}
    />
  );
}

export default FoundationsIndexPage;

export async function getStaticProps({ preview = false }) {
  const { data: pageData, query } = await getIndexPageFor('foundation');

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
