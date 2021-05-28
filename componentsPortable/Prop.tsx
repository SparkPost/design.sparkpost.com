import React from 'react';
import { Box } from '@sparkpost/matchbox';
import { PortableText } from '@lib/sanity';
import InlineCode from './InlineCode';
import styled from 'styled-components';

const NegateMargins = styled(Box)`
  p {
    margin-bottom: 0 !important;
  }
`;

type PropTypes = {
  node: {
    name: string;
    type?: string;
    description?: object[];
    required?: boolean;
    deprecated?: boolean;
    defaultValue?: string;
  };
};
function Prop(props: PropTypes): JSX.Element {
  const {
    node: { name, required, description, deprecated, type, defaultValue }
  } = props;

  return (
    <Box mb="700">
      <Box display="flex" mb="100">
        <Box pr="200">
          <InlineCode fontSize="90%">{name}</InlineCode>
        </Box>
        {required && (
          <Box px="200" color="scheme.heavyAccent">
            Required
          </Box>
        )}
        {deprecated && (
          <Box px="200" color="scheme.warning">
            Deprecated
          </Box>
        )}
      </Box>
      <NegateMargins mb="200">
        <PortableText blocks={description} />
      </NegateMargins>
      <Box display="flex">
        <Box pr="300">
          <Box fontSize="100">TYPE</Box>
          <Box>
            <InlineCode>{type}</InlineCode>
          </Box>
        </Box>
        {defaultValue && (
          <Box>
            <Box fontSize="100">DEFAULT</Box>
            <Box>
              <InlineCode>{defaultValue}</InlineCode>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Prop;
