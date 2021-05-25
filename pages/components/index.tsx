import React from 'react';
import { getIndexPageFor } from '@lib/api';
import { IndexLayout } from '@components/indexLayout';

function ComponentsIndexPage({ data }) {
  const { site, settings, list } = data.pageData;

  const siteSeo = site?.seo;
  const pageSeo = settings?.seo;

  const seo = {
    metaTitle: pageSeo?.metaTitle || siteSeo?.metaTitle,
    metaDescription: pageSeo?.metaDescription || siteSeo?.metaDescription,
    metaKeywords: pageSeo?.metaKeywords || siteSeo?.metaKeywords,
    metaImage: pageSeo?.metaImage || siteSeo?.metaImage
  };

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
