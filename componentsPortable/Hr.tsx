import React from 'react';
import { Box } from '@sparkpost/matchbox';

function Hr(): JSX.Element {
  return <Box as="hr" my="700" bg="scheme.lightFg" height="2px" borderRadius="pill"></Box>;
}

export default Hr;
