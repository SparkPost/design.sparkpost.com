import React from 'react';
import { Box } from '@sparkpost/matchbox';
import { meta } from '@sparkpost/design-tokens';
// import Color from 'color';
import styled from 'styled-components';
// import css from '@styled-system/css';

type ColorProps = {
  node: {
    group: string;
    description?: string;
  };
};

const StyledColor = styled(Box)`
  cursor: pointer;
  transform: scale(1);
  position: relative;
  z-index: 1;
  transition: all 100ms ease-in-out;

  &:hover {
    transform: scale(1.05) translateX(-8px);
    transition: all 100ms ease-in-out;
    z-index: 10;
  }
`;

function ColorPalette(props: ColorProps): JSX.Element {
  const { group, description } = props.node;

  const colors = meta.filter(({ javascript }) => {
    return group === 'Brand'
      ? javascript.includes('brand')
      : javascript.includes(group.toLowerCase()) && !javascript.includes('brand');
  });

  return (
    <Box data-id="color-palette" width="50%" pr="500" mr="0" pb="600" verticalAlign="top">
      <Box mb="500">
        <Box as="h3" mb="400">
          {group}
        </Box>
        {description && <p>{description}</p>}
        {colors.map((color) => {
          return (
            <Box key={color.name}>
              <StyledColor
                width="100%"
                height="3em"
                bg={color.value}
                display="flex"
                justifyContent="center"
                alignItems="center"
                border="thick"
                mb="-2px"
              >
                <Box color="white">{color.friendly.replace('Color ', '')}</Box>
              </StyledColor>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default ColorPalette;
