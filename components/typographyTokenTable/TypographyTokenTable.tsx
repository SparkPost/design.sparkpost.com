import React from 'react';
import { meta } from '@sparkpost/design-tokens';
import { Box } from '@sparkpost/matchbox';
import { Button } from '@components/button';
import { CopyButton } from '@components/copyButton';
import styled from 'styled-components';

const fontTokens = meta
  .filter((t) => t.name.includes('font-size-'))
  .filter((t) => !t.name.includes('root'))
  .sort(({ javascript: js1 }, { javascript: js2 }) => {
    const v1 = Number(js1.replace('fontSize_', ''));
    const v2 = Number(js2.replace('fontSize_', ''));
    return v1 > v2 ? 1 : -1;
  });

type ThProps = {
  children: React.ReactNode;
  align?: 'left' | 'right';
  width?: string;
};

const Uppercase = styled.span`
  text-transform: uppercase;
`;

function Th(props: ThProps): JSX.Element {
  const { children, align = 'left', width } = props;

  return (
    <Box
      as="th"
      textAlign={align}
      fontSize="100"
      fontWeight="400"
      lineHeight="100"
      py="100"
      width={width}
    >
      <Uppercase>{children}</Uppercase>
    </Box>
  );
}

function TypographyTokenTable(): JSX.Element {
  const [syntax, setSyntax] = React.useState('css');
  const [family, setFamily] = React.useState('sans');
  const [weight, setWeight] = React.useState('normal');

  const familyMeta = meta.find((t) => {
    return t.name.includes(family);
  });

  const weightMeta = meta.find((t) => {
    return t.name.includes(weight);
  });

  return (
    <Box>
      <Box display="flex">
        <Box>
          <Box mb="100" fontSize="200" lineHeight="200">
            Font Stack
          </Box>
          <Box mb="600">
            <Button.Group>
              <Button onClick={() => setFamily('sans')} active={family === 'sans'}>
                Sans
              </Button>
              <Button onClick={() => setFamily('monospace')} active={family === 'monospace'}>
                Monospace
              </Button>
            </Button.Group>
          </Box>
        </Box>
        <Box ml="400">
          <Box mb="100" fontSize="200" lineHeight="200">
            Font Weight
          </Box>
          <Box mb="600">
            <Button.Group>
              <Button onClick={() => setWeight('light')} active={weight === 'light'}>
                Light
              </Button>
              <Button onClick={() => setWeight('normal')} active={weight === 'normal'}>
                Normal
              </Button>
              <Button onClick={() => setWeight('medium')} active={weight === 'medium'}>
                Medium
              </Button>
              <Button onClick={() => setWeight('semibold')} active={weight === 'semibold'}>
                Semibold
              </Button>
            </Button.Group>
          </Box>
        </Box>
      </Box>

      <Box mb="100" fontSize="200" lineHeight="200">
        Code Format
      </Box>
      <Box mb="600">
        <Button.Group>
          <Button onClick={() => setSyntax('css')} active={syntax === 'css'}>
            CSS
          </Button>
          <Button onClick={() => setSyntax('scss')} active={syntax === 'scss'}>
            Scss
          </Button>
          <Button onClick={() => setSyntax('javascript')} active={syntax === 'javascript'}>
            JavaScript
          </Button>
          <Button onClick={() => setSyntax('system')} active={syntax === 'system'}>
            System Prop
          </Button>
        </Button.Group>
      </Box>

      <Box mb="600">
        <Box as="table" width="100%">
          <thead>
            <Box as="tr">
              <Th width="70%">Font Family</Th>
              <Th align="right">Font Weight</Th>
            </Box>
          </thead>
          <tbody>
            <tr>
              <Box as="td" borderTop="1px solid transparent" borderColor="scheme.lightFg" py="300">
                <Box>
                  <CopyButton textAlign="left">{familyMeta.value}</CopyButton>
                </Box>
                <Box>
                  <CopyButton>{familyMeta[syntax]}</CopyButton>
                </Box>
              </Box>
              <Box as="td" borderTop="1px solid transparent" borderColor="scheme.lightFg" py="300">
                <Box textAlign="right">
                  <CopyButton>{weightMeta.value}</CopyButton>
                </Box>
                <Box textAlign="right">
                  <CopyButton>{weightMeta[syntax]}</CopyButton>
                </Box>
              </Box>
            </tr>
          </tbody>
        </Box>
      </Box>

      <Box>
        <Box as="table" width="100%" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <Box as="tr">
              <Th>Example</Th>
              <Th align="right" width="25%">
                Font Size
              </Th>
              <Th align="right" width="25%">
                Line Height
              </Th>
            </Box>
          </thead>
          <tbody>
            {fontTokens.map((t) => {
              const lineHeightMeta = meta
                .filter((m) => m.category === 'line-height')
                .find((m) => {
                  const match = m.name.endsWith(t.name.replace('font-size-', ''));
                  return match || m.name.endsWith('100'); // Returns lh 100 for font size 50
                });

              return (
                <Box as="tr" key={t.name}>
                  <Box
                    as="td"
                    py="300"
                    borderTop="1px solid transparent"
                    borderBottom="1px solid transparent"
                    borderColor="scheme.lightFg"
                  >
                    <Box
                      fontSize={t.value}
                      lineHeight="1.5em"
                      fontWeight={weight}
                      fontFamily={family}
                    >
                      {family.charAt(0).toUpperCase()}
                      {family.slice(1)} {t.friendly.replace('Font Size ', '')}
                    </Box>
                  </Box>

                  <Box
                    as="td"
                    textAlign="right"
                    py="300"
                    borderTop="1px solid transparent"
                    borderBottom="1px solid transparent"
                    borderColor="scheme.lightFg"
                  >
                    <div>
                      <CopyButton>{t.value}</CopyButton>
                    </div>
                    <div>
                      <CopyButton>{t.pixel_value}</CopyButton>
                    </div>
                    <div>
                      <CopyButton>{t[syntax]}</CopyButton>
                    </div>
                  </Box>

                  <Box
                    as="td"
                    textAlign="right"
                    py="300"
                    borderTop="1px solid transparent"
                    borderBottom="1px solid transparent"
                    borderColor="scheme.lightFg"
                  >
                    <div>
                      <CopyButton>{lineHeightMeta.value}</CopyButton>
                    </div>
                    <div>
                      <CopyButton>{lineHeightMeta.pixel_value}</CopyButton>
                    </div>
                    <div>
                      <CopyButton>{lineHeightMeta[syntax]}</CopyButton>
                    </div>
                  </Box>
                </Box>
              );
            })}
          </tbody>
        </Box>
      </Box>
    </Box>
  );
}

export default TypographyTokenTable;
