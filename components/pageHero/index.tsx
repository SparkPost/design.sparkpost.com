import React from 'react';
import { Box } from '@sparkpost/matchbox';
import { formatDate } from '@utils/date';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  updatedAt?: string;
};

function PageHero(props: PageHeroProps): JSX.Element {
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
        <Box as="p" mt="400" fontSize="600" lineHeight="600" width={['100%', null, '70%']}>
          {props.subtitle}
        </Box>
      </Box>
    </Box>
  );
}

export default PageHero;
