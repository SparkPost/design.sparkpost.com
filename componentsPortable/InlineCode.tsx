import React from 'react';
import { Box } from '@sparkpost/matchbox';

function InlineCode(props): JSX.Element {
  return (
    <Box
      as="code"
      bg="scheme.lightAccent"
      display="inline-block"
      px="100"
      py="100"
      fontSize="70%"
      borderRadius="3px"
    >
      {props.children}
    </Box>
  );
}

export default InlineCode;
