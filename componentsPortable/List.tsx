import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';

type ListProps = {
  type: 'bullet' | 'number';
};

function List(props: ListProps): JSX.Element {
  const { type } = props;

  if (type === 'bullet') {
    return <Ul {...props} />;
  }

  if (type === 'number') {
    return <Ol {...props} />;
  }

  return null;
}

const StyledUl = styled.ul`
  ${css({ mb: '600', mt: '0' })}
  & ul {
    margin-bottom: 0;
  }
`;

function Ul(props): JSX.Element {
  return <StyledUl>{props.children}</StyledUl>;
}

const StyledOl = styled.ul`
  ${css({ mb: '600', mt: '0' })}
  & ol {
    margin-bottom: 0;
  }
`;

function Ol(props): JSX.Element {
  return <StyledOl>{props.children}</StyledOl>;
}

export default List;
