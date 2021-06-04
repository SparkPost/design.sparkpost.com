import React from 'react';
import { meta } from '@sparkpost/design-tokens';
import { Box } from '@sparkpost/matchbox';
import { Button } from '@components/button';
import { CopyButton } from '@components/copyButton';
import styled from 'styled-components';
import css from '@styled-system/css';

const Input = styled.input`
  ${css({
    width: '100%',
    px: '200',
    py: '200',
    border: 'thick',
    bg: 'scheme.bg',
    color: 'scheme.fg'
  })}

  &:focus {
    outline: none;
    ${css({
      borderColor: 'scheme.heavyAccent'
    })}
  }
`;

function TokenReferenceTable(): JSX.Element {
  const [syntax, setSyntax] = React.useState('css');
  const [search, setSearch] = React.useState('');

  return (
    <Box mb="600">
      <Box mb="300">
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
      <Box mb="300">
        <Input
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          type="text"
          placeholder="Search for a token"
        />
      </Box>
      <Box as="table" width="100%">
        <tbody>
          {meta.map((token) => {
            const { name, friendly, value, pixel_value } = token;

            if (
              search &&
              !friendly.includes(search) &&
              !name.includes(search) &&
              !value.includes(search)
            ) {
              return null;
            }

            return (
              <Box as="tr" key={name}>
                <Box as="td" width="30%" py="200">
                  <Box fontWeight="medium">{friendly}</Box>
                </Box>
                <Box as="td" py="200" px="200" width="20%" textAlign="right">
                  <CopyButton>{value}</CopyButton>
                </Box>
                <Box as="td" py="200" px="200" width="15%" textAlign="right">
                  {pixel_value && <CopyButton>{pixel_value}</CopyButton>}
                </Box>
                <Box as="td" py="200" textAlign="right">
                  <CopyButton>{token[syntax]}</CopyButton>
                </Box>
              </Box>
            );
          })}
        </tbody>
      </Box>
    </Box>
  );
}

export default TokenReferenceTable;
