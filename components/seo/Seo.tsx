import Head from 'next/head';
import { urlFor } from '@lib/sanity';

type SeoProps = {
  title: string;
  description: string;
  keywords: string;
  image: object;
  favicon?: object;
};

const SEO: React.FC<SeoProps> = (props: SeoProps) => {
  const { title, description, keywords, image, favicon } = props;
  const url = urlFor(image).width(1200).height(630).url();
  const faviconUrl = urlFor(favicon).width(100).height(100).url();

  return (
    <Head>
      <meta charSet="utf-8"></meta>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{title}</title>
      <link rel="shortcut icon" type="image/png" href={faviconUrl} />
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="og:site_name" content={title} />
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {keywords && <meta name="keywords" content={keywords} />}
      {url && (
        <>
          <meta property="og:image" content={url} />
          <meta name="twitter:image" content={url} />
        </>
      )}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      <link
        href="/assets/critical.css"
        rel="preload"
        as="style"
        // @ts-expect-error
        onLoad="this.rel='stylesheet'"
      />
    </Head>
  );
};

export default SEO;
