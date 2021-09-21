import React, { useState, useEffect } from 'react';
import { Box, styles } from '@sparkpost/matchbox';
import { meta, tokens } from '@sparkpost/design-tokens';
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
  width: ['calc(100% + 16px)', null, 'calc(100% + 30px)'],
  left: ['-8px', null, '-15px'],
  transition: 'all 100ms ease-in-out',
  zIndex: 10
};

const StyledColor = styled.button<{ $color?: any; $active: boolean }>`
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
      backgroundColor: props.$color.value,
      border: 'thick',
      mt: '-2px'
    })}

  &:hover {
    ${css({
      width: ['calc(100% + 8px)', null, 'calc(100% + 16px)'],
      left: ['-4px', null, '-8px']
    })}
    transition: all 100ms ease-in-out;
    z-index: 5;
  }

  ${(props) =>
    props.$active &&
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
      bg="scheme.bg"
      ml="-2px"
      minHeight="500px"
      position="relative"
      zIndex="2"
      width="50%"
    >
      <StyledColorBlock bg={value} height={['30%', null, '50%']} width="100%" borderBottom="thick">
        <Box
          display={['none', null, 'flex']}
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="flex-end"
          p="500"
          flexDirection={['column', null, 'row']}
          fontSize={['100', null, '300']}
        >
          <Box display="flex" alignItems="flex-end" mr={['0', null, '600']} mb={['300', null, '0']}>
            <Box textAlign="center" mr="200" width="45px">
              <Box fontSize="200" lineHeight="100" color="gray.900">
                A
              </Box>
              <Box mt="100" fontSize="100" bg="black" color="white">
                {checkContrast(value, tokens.color_gray_900) ? 'PASS' : 'FAIL'}
              </Box>
            </Box>
            <Box textAlign="center" mr="200" width="45px">
              <Box fontSize="600" lineHeight="400" color="gray.900">
                A
              </Box>
              <Box mt="100" fontSize="100" bg="black" color="white">
                {checkContrast(value, tokens.color_gray_900, true) ? 'PASS' : 'FAIL'}
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
        <ColorValue label="Hexadecimal" value={value} />
        <ColorValue label="RGB" value={c.rgb().string()} />
        <ColorValue label="JS" value={javascript} />
        <ColorValue label="CSS" value={css} />
        <ColorValue label="Scss" value={scss} />
        <ColorValue label="System Prop" value={sp} />
      </Box>
    </Box>
  );
}

function ColorValue({ label, value }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      pb="200"
      flexWarap="wrap"
      flexDirection={['column', null, 'row']}
      alignItems={['flex-start', null, '']}
    >
      <Box pb={['100', null, '0']}>{label}:</Box>
      <CopyButton>{value}</CopyButton>
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
        <Box data-id="color-palette" width={['45%', null, '50%']} position="relative" zIndex="1">
          <Box mt="2px">
            {colors.map((color) => {
              const c = Color(color.value);
              return (
                <Box key={color.name}>
                  <StyledColor
                    $color={color}
                    $active={color.value === activeColor?.value}
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
