import React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@sparkpost/matchbox';
import { formatDate } from '@utils/date';
import { Category } from '@components/category';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  updatedAt?: string;
  enableCategory?: boolean;
};

function PageHero(props: PageHeroProps): JSX.Element {
  const router = useRouter();

  const category = React.useMemo(() => {
    if (!router.asPath) {
      return '';
    }

    return router.asPath.split('/')?.[1];
  }, []);

  return (
    <Box py="800" border="thick" my="-2px">
      <Box maxWidth="1200" m="0 auto" py="800" px="400">
        {props.updatedAt ? (
          <Box fontSize="100" lineHeight="100">
            Updated {formatDate(props.updatedAt)}
          </Box>
        ) : (
          ''
        )}
        <Box as="h1">{props.title}</Box>
        {props.enableCategory && category && (
          <Box mb="400">
            <Category category={category} />
          </Box>
        )}
        <Box as="p" mt="400" fontSize="600" lineHeight="600" width={['100%', null, '85%']}>
          {props.subtitle}
        </Box>
      </Box>
    </Box>
  );
}

export default PageHero;
