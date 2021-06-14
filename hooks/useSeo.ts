type SeoProps = {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  metaImage?: object;
  favicon?: object;
};

type Props = {
  // Page level SEO settings
  page: SeoProps;
  // Site level SEO settings
  site: SeoProps;
  // Page title field
  pageTitle?: string;
};

function useSeo(props: Props) {
  const { page: pageSeo, site: siteSeo, pageTitle } = props;

  const seoProps = {
    title: pageSeo?.metaTitle || pageTitle || siteSeo?.metaTitle,
    description: pageSeo?.metaDescription || siteSeo?.metaDescription,
    keywords: pageSeo?.metaKeywords || siteSeo?.metaKeywords,
    image: pageSeo?.metaImage || siteSeo?.metaImage,
    favicon: siteSeo?.favicon
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
