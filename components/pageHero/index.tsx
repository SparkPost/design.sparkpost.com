import React from 'react';
import { Box } from '@sparkpost/matchbox';

type PageHeroProps = {
  title: string;
  subtitle?: string;
};

function PageHero(props: PageHeroProps): JSX.Element {
  return (
    <Box py="800" border="thick" my="-2px">
      <Box maxWidth="1300" m="0 auto" py="800" px="400">
        <Box as="h1">{props.title}</Box>
        <Box as="p" mt="400" fontSize="600" lineHeight="600" width={['100%', null, '50%']}>
          {props.subtitle}
        </Box>
      </Box>
    </Box>
  );
}

export default PageHero;
