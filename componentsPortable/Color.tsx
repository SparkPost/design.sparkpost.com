import React from 'react';
import { Box, useCopyToClipboard, styles } from '@sparkpost/matchbox';
import { meta, tokens } from '@sparkpost/design-tokens';
import Color from 'color';
import styled from 'styled-components';
import css from '@styled-system/css';

type ColorProps = {
  node: {
    name: string;
    description?: string;
    label?: string;
  };
};

const CopyButton = styled.button`
  ${styles.buttonReset}
  cursor: pointer;
  &:hover {
    ${css({
      color: 'scheme.heavyAccent'
    })}
  }
`;

function ColorComponent(props: ColorProps): JSX.Element {
  const { name, description, label } = props.node;

  const color = meta.filter(({ javascript }) => javascript === name).shift();
  const c = Color(color.value);

  const { copy: rgbCopy, copied: rgbCopied } = useCopyToClipboard();
  const { copy: hexCopy, copied: hexCopied } = useCopyToClipboard();

  return (
    <Box
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
        <Box mb="200">
          {label && `${label}, `}
          {color.friendly}
        </Box>
        <Box fontSize="100" lineHeight="100" mb="200" display="flex">
          <Box pr="400" minWidth="6.5rem">
            <Box>RGB</Box>
            <CopyButton onClick={() => rgbCopy(c.rgb().string())}>
              {rgbCopied ? 'Copied' : c.rgb().string()}
            </CopyButton>
          </Box>
          <Box>
            <Box>HEX</Box>
            <CopyButton onClick={() => hexCopy(color.value)}>
              {hexCopied ? 'Copied' : color.value}
            </CopyButton>
          </Box>
        </Box>
        <Box>{description}</Box>
      </Box>
    </Box>
  );
}

export default ColorComponent;
