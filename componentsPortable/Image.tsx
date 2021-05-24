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
      p="0"
      width="100%"
      borderRadius="rounded"
      overflow="hidden"
      display="block"
    >
      <Box as="img" display="block" width="100%" src={props.source} />
    </Box>
  );
}

export default Image;
