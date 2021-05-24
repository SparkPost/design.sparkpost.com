import React, { useState } from 'react';
import { Box, styles } from '@sparkpost/matchbox';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

const Copy = styled(Box)`
  ${styles.buttonReset}
  cursor: pointer;
  border: ${(props) => props.theme.borders.thick};
  border-bottom-left-radius: 4px;
  padding: ${(props) => `${props.theme.space['100']} ${props.theme.space['500']}`};
  background: ${(props) => props.theme.colors.white};
`;

type CodeProps = {
  node: {
    code: string;
    language: string;
  };
};

function Code(props: CodeProps): JSX.Element {
  const {
    node: { language, code }
  } = props;
  const [copied, setCopied] = useState(false);

  if (!code) {
    return null;
  }

  const onCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Box border="thick" borderRadius="rounded" position="relative" overflow="hidden">
      <CopyToClipboard text={code} onCopy={onCopy}>
        <Copy position="absolute" right="-4px" top="-2px" as="button">
          {copied ? 'Copied' : 'Copy'}
        </Copy>
      </CopyToClipboard>
      <Box overflow="scroll" minHeight="290px" maxHeight="600px" p="500">
        <SyntaxHighlighter
          language={language || 'text'}
          customStyle={{
            backgroundColor: 'transparent'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
}

export default Code;
