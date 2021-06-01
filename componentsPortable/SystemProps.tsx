import React from 'react';
import { Box, Inline } from '@sparkpost/matchbox';
import * as StyledSystem from 'styled-system';
import InlineCode from './InlineCode';

type SystemPropsProps = {
  node: {
    keys?: string;
  };
};

function SystemProps(props: SystemPropsProps): JSX.Element {
  const { keys } = props.node;
  const keyArray = keys
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);

  return (
    <Box mb="600">
      <Box display="grid" gridTemplateColumns="6rem 1fr" gridGap="400">
        <Box fontSize="100">CATEGORY</Box>
        <Box fontSize="100">AVAILABLE PROPS</Box>
      </Box>
      {keyArray.map((key) => {
        const names = StyledSystem[key]?.propNames;

        if (!names) {
          return <Box key={key}>Error, could not find system props for '{key}'</Box>;
        }

        return (
          <Box key={key} display="grid" gridTemplateColumns="6rem 1fr" gridGap="400" mb="300">
            <Box>
              <InlineCode>{key}</InlineCode>
            </Box>
            <Box>
              <Inline space="100">
                {names.map((name: string) => {
                  return (
                    <Box key={name}>
                      <InlineCode>{name}</InlineCode>
                    </Box>
                  );
                })}
              </Inline>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default SystemProps;
