import React from 'react';
import { meta } from '@sparkpost/design-tokens';
import { Box } from '@sparkpost/matchbox';
import { Button } from '@components/button';
import { CopyButton } from '@components/copyButton';
import styled from 'styled-components';

const shadowTokens = meta
  .filter((t) => t.category.includes('box-shadow'))
  .sort(({ javascript: js1 }, { javascript: js2 }) => {
    const v1 = Number(js1.replace('boxShadow_', ''));
    const v2 = Number(js2.replace('boxShadow_', ''));
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

function ElevationTokenTable(): JSX.Element {
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
              <Th width="22%">Example</Th>
              <Th>Token</Th>
              <Th align="right" width="12%">
                X Y RGBA
              </Th>
              <Th align="right" width="25%">
                Code
              </Th>
            </Box>
          </thead>
          <tbody>
            {shadowTokens.map((t) => {
              return (
                <Box as="tr" key={t.name}>
                  <Box as="td" py="200" pr="400">
                    <Box
                      bg="scheme.bg"
                      height="1.5rem"
                      boxShadow={t.value}
                      border="thick"
                      borderWidth="1px"
                    ></Box>
                  </Box>
                  <Box as="td" py="200">
                    {t.friendly}
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

export default ElevationTokenTable;
