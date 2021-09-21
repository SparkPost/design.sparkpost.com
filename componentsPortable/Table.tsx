import React from 'react';
import { Box, BoxProps } from '@sparkpost/matchbox';
import { PortableText } from '@lib/sanity';
import styled from 'styled-components';
import css from '@styled-system/css';

const StyledWrapper = styled(Box)<BoxProps>`
  ${css({
    border: 'thick',
    borderColor: 'scheme.lightFg',
    borderRadius: 'rounded'
  })}
  overflow: hidden;
`;

const StyledTable = styled.table`
  border-collapse: collapse;

  p {
    margin: 0;
  }

  td {
    vertical-align: top;
    ${css({
      p: '300'
    })}
  }

  tr:not(:last-child) {
    ${css({
      borderBottom: 'thick',
      borderColor: 'scheme.lightFg'
    })}
  }

  td:not(:last-child) {
    ${css({
      borderRight: 'thick',
      borderColor: 'scheme.lightFg'
    })}
  }
`;

type TableProps = {
  node: {
    rows: {
      cells: {
        content: object[];
      }[];
    }[];
  };
};

function Table(props: TableProps): JSX.Element {
  const { node } = props;
  return (
    <StyledWrapper as="div" mb="600">
      <StyledTable width="100%" cellPadding="0">
        <tbody>
          {node.rows.map((row, i) => {
            return (
              <Box as="tr" key={i}>
                {row.cells.map((cell, index) => {
                  return (
                    <Box key={`cell${index}`} as="td">
                      <PortableText blocks={cell.content} />
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledWrapper>
  );
}

export default Table;
