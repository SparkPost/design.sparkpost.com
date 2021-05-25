import React from 'react';
import { getIndexPageFor } from '@lib/api';
import { IndexLayout } from '@components/indexLayout';

function ComponentsIndexPage({ data }) {
  const { site, settings, list } = data.pageData;

  return (
    <IndexLayout
      seo={site?.seo}
      headerList={site?.header?.menu?.items}
      enableSidebar={settings.enableSidebar}
      sidebarList={list}
      layoutType={settings.layout}
      list={list}
      footerList={site?.footer?.menu?.items}
      title={settings.title}
      subtitle={settings.subtitle}
    />
  );
}

export default ComponentsIndexPage;

export async function getStaticProps({ preview = false }) {
  const { data: pageData, query } = await getIndexPageFor('component');

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
