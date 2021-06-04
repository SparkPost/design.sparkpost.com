import React from 'react';
import { styles, useCopyToClipboard } from '@sparkpost/matchbox';
import styled from 'styled-components';
import css from '@styled-system/css';

const StyledCopyButton = styled.button`
  ${styles.buttonReset}
  cursor: pointer;
  text-align: right;

  ${({ fontSize }) =>
    css({
      fontSize,
      fontFamily: 'monospace'
    })}

  &:hover {
    ${css({
      color: 'scheme.heavyAccent'
    })}
  }
`;

type CopyButtonProps = {
  children: React.ReactNode;
  fontSize?: string;
};

function CopyButton(props: CopyButtonProps): JSX.Element {
  const { children, fontSize = '100' } = props;
  const { copy, copied } = useCopyToClipboard();

  return (
    <StyledCopyButton onClick={() => copy(children)} fontSize={fontSize}>
      {copied ? 'Copied' : children}
    </StyledCopyButton>
  );
}

export default CopyButton;
