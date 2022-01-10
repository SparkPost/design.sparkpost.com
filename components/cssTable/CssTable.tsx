import { useState } from 'react';
import { Table } from '@sparkpost/matchbox';
import { Box } from '@sparkpost/matchbox';
import { CopyButton } from '@components/copyButton';
import styled from 'styled-components';
import css from '@styled-system/css';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const classes = require('@sparkpost/matchbox-css/dist/index.css/index.css').toString();

const IGNORE_KEYS = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '@media',
  'hover',
  'focus-visible',
  'active',
  'disabled',
  'focus',
  'visited'
];

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

function CssTable(): JSX.Element {
  const [search, setSearch] = useState('');

  const classData = classes.split('}').filter((item: string) => {
    return item && !IGNORE_KEYS.some((val) => item.includes(val));
  });

  return (
    <div>
      <Box mb="300">
        <Input
          onChange={(e) => setSearch(e.currentTarget.value)}
          type="text"
          placeholder="Search for a class"
        />
      </Box>
      <Table title="Matchbox CSS Classes">
        <thead>
          <Table.HeaderCell width="40%">Class Name</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </thead>
        <tbody>
          {classData.map((item) => {
            const className = item.split('{')[0] || '';
            const value = item.split('{')[1] || '';
            if (search && !className.includes(search) && !value.includes(search)) {
              return null;
            }

            return (
              <Table.Row key={item}>
                <Table.Cell>
                  <Box as="span" fontWeight="medium">
                    {className}
                  </Box>
                </Table.Cell>
                <Table.Cell>
                  <CopyButton>{value.replace(':', ': ')}</CopyButton>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CssTable;
