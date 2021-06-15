import React from 'react';
import { Box } from '@sparkpost/matchbox';

type ImageProps = {
  source: string;
};

function Image(props: ImageProps): JSX.Element {
  return (
    <Box
      as="figure"
      m="0"
      mb="600"
      p="0"
      width="100%"
      borderRadius="rounded"
      overflow="hidden"
      display="block"
      border="thick"
    >
      <Box
        as="img"
        display="block"
        maxWidth="100%"
        maxHeight="25rem"
        m="0 auto"
        src={props.source}
      />
    </Box>
  );
}

export default Image;
