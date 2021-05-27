import React from 'react';
import { getIndexPageFor } from '@lib/api';
import { IndexLayout } from '@components/indexLayout';
import useSeo from '@hooks/useSeo';

function UpdatesIndexPage({ data }) {
  const { site, settings, list } = data.pageData;

  const { seo } = useSeo({
    site: site?.seo,
    page: settings?.seo
  });

  return (
    <IndexLayout
      seo={seo}
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

export default UpdatesIndexPage;

export async function getStaticProps({ preview = false }) {
  const { data: pageData, query } = await getIndexPageFor('update', { order: '_updatedAt desc' });

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
