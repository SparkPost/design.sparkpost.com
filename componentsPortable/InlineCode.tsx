import React from 'react';
import { Box } from '@sparkpost/matchbox';

type InlineCodeTypes = {
  children: React.ReactNode;
  fontSize?: string;
  display?: string;
};

function InlineCode(props: InlineCodeTypes): JSX.Element {
  const { children, fontSize = '70%', display = 'inline-block' } = props;
  return (
    <Box
      as="code"
      bg="scheme.lightAccent"
      display={display}
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
