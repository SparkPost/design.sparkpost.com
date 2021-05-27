type SeoProps = {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  metaImage?: object;
  favicon?: object;
};

type Props = {
  page: SeoProps;
  site: SeoProps;
};

function useSeo(props: Props) {
  const { page, site } = props;

  const seoProps = {
    title: page?.metaTitle || site?.metaTitle,
    description: page?.metaDescription || site?.metaDescription,
    keywords: page?.metaKeywords || site?.metaKeywords,
    image: page?.metaImage || site?.metaImage,
    favicon: site?.favicon
  };

  const getSeoProps = () => ({
    ...seoProps
  });

  return {
    seo: seoProps,
    getSeoProps
  };
}

export default useSeo;
