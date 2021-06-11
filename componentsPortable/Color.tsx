import React from 'react';
import { Box } from '@sparkpost/matchbox';
import { meta, tokens } from '@sparkpost/design-tokens';
import Color from 'color'; //eslint-disable-line
import { CopyButton } from '@components/copyButton';
import styled from 'styled-components';
import css from '@styled-system/css';

type ColorProps = {
  node: {
    name: string;
    description?: string;
    label?: string;
  };
};

const StyledWrapper = styled(Box)`
  &:nth-of-type(even) {
    ${css({
      pr: ['0', null, '500']
    })}
  }
`;

function ColorComponent(props: ColorProps): JSX.Element {
  const { name, description, label } = props.node;

  const color = meta.filter(({ javascript }) => javascript === name).shift();
  const c = Color(color.value);

  return (
    <StyledWrapper
      data-id="color-description"
      display="inline-block"
      width="50%"
      pr={['400', null, '500']}
      mr="0"
      mb="600"
      verticalAlign="top"
    >
      <Box>
        <Box bg={tokens[color.javascript]} height="6rem" width="100%" border="thick" mb="200"></Box>
        <Box mb="200">
          {label && `${label}, `}
          {color.friendly}
        </Box>
        <Box fontSize="100" lineHeight="100" mb="200" display="flex" flexWrap="wrap">
          <Box pr="400" minWidth="6.5rem" width={['100%', null, 'auto']} pb={['200', null, '0']}>
            <Box>RGB</Box>
            <CopyButton fontSize="50">{c.rgb().string()}</CopyButton>
          </Box>
          <Box width={['100%', null, 'auto']}>
            <Box>HEX</Box>
            <CopyButton fontSize="50">{color.value}</CopyButton>
          </Box>
        </Box>
        <Box>{description}</Box>
      </Box>
    </StyledWrapper>
  );
}

export default ColorComponent;
