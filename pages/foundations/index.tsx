import React from 'react';
import { getIndexPageFor } from '@lib/api';
import Link from 'next/link';
import { Header } from '@components/header';
import Footer from '@components/footer';

function FoundationsIndexPage({ data }) {
  const { header, footer, settings, list } = data.pageData;
  console.log(data.pageData.settings);

  return (
    <div>
      <Header title="Matchbox" items={header?.menu?.items} />
      <h1>{settings.title}</h1>

      <ul>
        {list.map((item) => (
          <li>
            <Link href={item.slug}>
              <a>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <Footer items={footer?.menu?.items} />
    </div>
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
