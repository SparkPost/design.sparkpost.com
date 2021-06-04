import React from 'react';
import { styles, useCopyToClipboard } from '@sparkpost/matchbox';
import styled from 'styled-components';
import css from '@styled-system/css';

const StyledCopyButton = styled.button`
  ${styles.buttonReset}
  cursor: pointer;
  text-align: right;

  ${css({
    fontSize: '100',
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
};

function CopyButton(props: CopyButtonProps): JSX.Element {
  const { children } = props;
  const { copy, copied } = useCopyToClipboard();

  return (
    <StyledCopyButton onClick={() => copy(children)}>
      {copied ? 'Copied' : children}
    </StyledCopyButton>
  );
}

export default CopyButton;
