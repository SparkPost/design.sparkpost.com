import React from 'react';
import { styles, useCopyToClipboard } from '@sparkpost/matchbox';
import styled from 'styled-components';
import css from '@styled-system/css';

const StyledCopyButton = styled.button`
  ${styles.buttonReset}
  cursor: pointer;

  ${({ fontSize, textAlign }) =>
    css({
      textAlign,
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
  textAlign?: string;
};

function CopyButton(props: CopyButtonProps): JSX.Element {
  const { children, fontSize = '100', textAlign = 'right' } = props;
  const { copy, copied } = useCopyToClipboard();

  return (
    <StyledCopyButton
      onClick={() => copy(String(children))}
      fontSize={fontSize}
      textAlign={textAlign}
    >
      {copied ? 'Copied' : children}
    </StyledCopyButton>
  );
}

export default CopyButton;
