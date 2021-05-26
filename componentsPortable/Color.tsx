import React from 'react';
import { Box } from '@sparkpost/matchbox';
import { meta, tokens } from '@sparkpost/design-tokens';
import styled from 'styled-components';
import Color from 'color';

type ColorProps = {
  node: {
    name: string;
    description?: string;
    label?: string;
  };
};

const Wrapper = styled(Box)`
  p + & {
    padding-left: 0;
  }
`;

function ColorComponent(props: ColorProps): JSX.Element {
  const { name, description, label } = props.node;

  const color = meta.filter(({ javascript }) => javascript === name).shift();
  const c = Color(color.value);

  return (
    <Wrapper
      data-id="color-description"
      display="inline-block"
      width="50%"
      pr="500"
      mr="0"
      mb="600"
      verticalAlign="top"
    >
      <Box>
        <Box bg={tokens[color.javascript]} height="6rem" width="100%" border="thick" mb="200"></Box>
        <Box>
          {label && `${label}, `}
          {color.friendly}
        </Box>
        <Box fontSize="100" mb="200">
          {c.rgb().string()}, {color.value}
        </Box>
        <Box>{description}</Box>
      </Box>
    </Wrapper>
  );
}

export default ColorComponent;
