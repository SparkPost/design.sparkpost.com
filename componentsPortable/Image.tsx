import React from 'react';
import { Box } from '@sparkpost/matchbox';

type ImageProps = {
  source: string;
  alt: string;
  caption: string;
};

function Image(props: ImageProps): JSX.Element {
  const { source, alt, caption } = props;
  return (
    <Box as="figure" m="0" p="0" width="100%" mb="600">
      <Box
        m="0"
        p="0"
        width="100%"
        borderRadius="rounded"
        overflow="hidden"
        display="block"
        border="thick"
      >
        <Box
          as="img"
          alt={alt}
          display="block"
          maxWidth="100%"
          maxHeight="25rem"
          m="0 auto"
          src={source}
        />
      </Box>
      <Box as="figcaption" fontSize="100" color="scheme.fg" textAlign="center">
        {caption}
      </Box>
    </Box>
  );
}

export default Image;
