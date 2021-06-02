import React from 'react';
import { Box, styles } from '@sparkpost/matchbox';
import styled from 'styled-components';
import css from '@styled-system/css';

const StyledButton = styled(Box)`
  ${styles.buttonReset}
  ${css({
    border: 'thick',
    px: '400',
    py: '200'
  })}
  cursor: pointer;
  &:hover {
    ${css({
      bg: 'scheme.lightAccent',
      color: 'scheme.fg'
    })}
  }

  ${({ isActive }) => {
    if (isActive) {
      return css({
        bg: 'scheme.fg',
        color: 'scheme.bg'
      });
    }
  }}
`;

function Button(props): JSX.Element {
  const { children, active, ...rest } = props;
  return (
    <StyledButton as="button" type="button" {...rest} isActive={active}>
      {children}
    </StyledButton>
  );
}

const StyledGroup = styled.div`
  button:not(:first-child) {
    margin-left: -2px !important;
  }
`;

function Group(props): JSX.Element {
  const { children } = props;
  return <StyledGroup>{children}</StyledGroup>;
}

Button.Group = Group;
export default Button;
