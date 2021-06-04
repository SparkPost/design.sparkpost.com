import React from 'react';
import { meta } from '@sparkpost/design-tokens';
import { Box } from '@sparkpost/matchbox';
import { Button } from '@components/button';
import { CopyButton } from '@components/copyButton';
import styled from 'styled-components';

const spacingTokens = meta
  .filter((t) => t.name.includes('spacing-'))
  .sort(({ javascript: js1 }, { javascript: js2 }) => {
    const v1 = Number(js1.replace('spacing_', ''));
    const v2 = Number(js2.replace('spacing_', ''));
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

function SpacingTokenTable(): JSX.Element {
  const [syntax, setSyntax] = React.useState('css');

  return (
    <Box>
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
      <Box>
        <Box as="table" width="100%">
          <thead>
            <Box as="tr">
              <Th>Example</Th>
              <Th>Token</Th>
              <Th align="right" width="12%">
                Pixel
              </Th>
              <Th align="right" width="12%">
                Rem
              </Th>
              <Th align="right" width="20%">
                Code
              </Th>
            </Box>
          </thead>
          <tbody>
            {spacingTokens.map((t) => {
              return (
                <Box as="tr" key={t.name}>
                  <Box as="td" py="200">
                    <Box bg="scheme.fg" height="2rem" width={t.pixel_value}></Box>
                  </Box>
                  <Box as="td" py="200">
                    {t.friendly}
                  </Box>
                  <Box as="td" textAlign="right" py="200">
                    <CopyButton>{t.pixel_value}</CopyButton>
                  </Box>
                  <Box as="td" textAlign="right" py="200">
                    <CopyButton>{t.value}</CopyButton>
                  </Box>
                  <Box as="td" textAlign="right" py="200">
                    <CopyButton>{t[syntax]}</CopyButton>
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

export default SpacingTokenTable;
