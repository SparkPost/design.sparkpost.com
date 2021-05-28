import React from 'react';
import { Box } from '@sparkpost/matchbox';

type InlineCodeTypes = {
  children: React.ReactNode;
  fontSize?: string;
};

function InlineCode(props: InlineCodeTypes): JSX.Element {
  const { children, fontSize = '70%' } = props;
  return (
    <Box
      as="code"
      bg="scheme.lightAccent"
      display="inline-block"
      px="100"
      py="0.18em"
      fontSize={fontSize}
      borderRadius="3px"
    >
      {children}
    </Box>
  );
}

export default InlineCode;
