import React, { useState, useEffect } from 'react';
import { Box, styles } from '@sparkpost/matchbox';
import { meta } from '@sparkpost/design-tokens';
import Color from 'color'; //eslint-disable-line
import styled from 'styled-components';
import css from '@styled-system/css';
import { CopyButton } from '@components/copyButton';

type ColorProps = {
  node: {
    group: string;
    description?: string;
  };
};

type DetailProps = {
  value: string;
  css: string;
  scss: string;
  javascript: string;
};

const activeStyles = {
  width: 'calc(100% + 30px)',
  left: '-15px',
  transition: 'all 100ms ease-in-out',
  zIndex: 10
};

const StyledColor = styled.button`
  ${styles.buttonReset}
  cursor: pointer;
  left: 0;
  position: relative;
  z-index: 1;
  transition: all 100ms ease-in-out;

  ${(props) =>
    css({
      width: 'calc(100%)',
      height: '3em',
      backgroundColor: props.color.value,
      border: 'thick',
      mt: '-2px'
    })}

  &:hover {
    width: calc(100% + 16px);
    left: -8px;
    transition: all 100ms ease-in-out;
    z-index: 5;
  }

  ${(props) =>
    props.active &&
    css({
      ...activeStyles,
      '&:hover': {
        ...activeStyles
      }
    })}
`;

const StyledColorBlock = styled(Box)`
  transition: background 400ms ease-in-out;
`;

const checkContrast = (c1, c2, isLarge = false) => {
  const contrast = Color(c1).contrast(Color(c2));
  const passingRatio = isLarge ? 3 : 4.5;

  return contrast >= passingRatio;
};

function ColorDetails(props: DetailProps): JSX.Element {
  const { value, css, scss, javascript } = props;

  const c = Color(value);
  const sp = javascript?.replace('color_', '').split('_').join('.');

  return (
    <Box
      flex="1"
      border="thick"
      bg="white"
      ml="-2px"
      minHeight="500px"
      position="relative"
      zIndex="2"
    >
      <StyledColorBlock bg={value} height="50%" width="100%" borderBottom="thick">
        <Box
          display="flex"
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="flex-end"
          p="500"
        >
          <Box display="flex" alignItems="flex-end" mr="600">
            <Box textAlign="center" mr="200" width="45px">
              <Box fontSize="200" lineHeight="100" color="black">
                A
              </Box>
              <Box mt="100" fontSize="100" bg="black" color="white">
                {checkContrast(value, '#000') ? 'PASS' : 'FAIL'}
              </Box>
            </Box>
            <Box textAlign="center" mr="200" width="45px">
              <Box fontSize="600" lineHeight="400" color="black">
                A
              </Box>
              <Box mt="100" fontSize="100" bg="black" color="white">
                {checkContrast(value, '#000', true) ? 'PASS' : 'FAIL'}
              </Box>
            </Box>
          </Box>
          <Box display="flex" alignItems="flex-end">
            <Box textAlign="center" mr="200" width="45px">
              <Box fontSize="200" lineHeight="100" color="white">
                A
              </Box>
              <Box mt="100" fontSize="100" bg="black" color="white">
                {checkContrast(value, '#fff') ? 'PASS' : 'FAIL'}
              </Box>
            </Box>
            <Box textAlign="center" mr="200" width="45px">
              <Box fontSize="600" lineHeight="400" color="white">
                A
              </Box>
              <Box mt="100" fontSize="100" bg="black" color="white">
                {checkContrast(value, '#fff', true) ? 'PASS' : 'FAIL'}
              </Box>
            </Box>
          </Box>
        </Box>
      </StyledColorBlock>
      <Box p="400" fontFamily="monospace" fontSize="100">
        <Box display="flex" justifyContent="space-between" pb="100">
          <Box>Hexadecimal:</Box>
          <CopyButton>{value}</CopyButton>
        </Box>
        <Box display="flex" justifyContent="space-between" pb="100">
          <Box>RGB:</Box>
          <CopyButton>{c.rgb().string()}</CopyButton>
        </Box>
        <Box display="flex" justifyContent="space-between" pb="100">
          <Box>JS:</Box>
          <CopyButton>{javascript}</CopyButton>
        </Box>
        <Box display="flex" justifyContent="space-between" pb="100">
          <Box>CSS:</Box>
          <CopyButton>{css}</CopyButton>
        </Box>
        <Box display="flex" justifyContent="space-between" pb="100">
          <Box>Scss:</Box>
          <CopyButton>{scss}</CopyButton>
        </Box>
        <Box display="flex" justifyContent="space-between" pb="100">
          <Box>System Prop:</Box>
          <CopyButton>{sp}</CopyButton>
        </Box>
      </Box>
    </Box>
  );
}

function ColorPalette(props: ColorProps): JSX.Element {
  const { group, description } = props.node;
  const [activeColor, setActiveColor] = useState<DetailProps>();

  const colors = meta.filter(({ javascript }) => {
    return group === 'Brand'
      ? javascript.includes('brand')
      : javascript.includes(group.toLowerCase()) && !javascript.includes('brand');
  });

  const initialColor = colors[0];

  useEffect(() => {
    setActiveColor(initialColor);
  }, [initialColor]);

  const setColor = (color: DetailProps) => {
    setActiveColor(color);
  };

  return (
    <Box mb="600">
      <Box as="h3" mb="400">
        {group}
      </Box>
      {description && <p>{description}</p>}
      <Box display="flex" pb="600">
        <Box data-id="color-palette" width="50%" position="relative" zIndex="1">
          <Box mt="2px">
            {colors.map((color) => {
              const c = Color(color.value);
              return (
                <Box key={color.name}>
                  <StyledColor
                    color={color}
                    active={color.value === activeColor?.value}
                    onClick={() => setColor(color)}
                  >
                    <Box color={c.lightness() >= 50 ? 'gray.1000' : 'white'}>
                      {color.friendly.replace('Color ', '')}
                    </Box>
                  </StyledColor>
                </Box>
              );
            })}
          </Box>
        </Box>
        <ColorDetails {...activeColor} />
      </Box>
    </Box>
  );
}

export default ColorPalette;
