import React, { useState } from 'react';
import { Box, styles } from '@sparkpost/matchbox';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { ColorSchemeContext } from '@context/ColorSchemeContext';
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

const Copy = styled(Box)`
  ${styles.buttonReset}
  cursor: pointer;
  border: ${(props) => props.theme.borders.thick};
  border-bottom-left-radius: 4px;
  width: 75px;
  background: ${(props) => props.theme.colors.scheme.bg};
`;

type CodeProps = {
  node: {
    code: string;
    language: string;
  };
  connectWithTop?: boolean;
};

function CodeBlock(props: CodeProps): JSX.Element {
  const {
    node: { language, code },
    connectWithTop
  } = props;

  const { colorScheme } = React.useContext(ColorSchemeContext);
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

  const formatted = prettier.format(code.trim(), {
    parser: 'babel',
    plugins: [parserBabel],
    tabWidth: 2,
    jsxSingleQuote: false
  });

  return (
    <Box
      border="thick"
      borderRadius="rounded"
      position="relative"
      overflow="hidden"
      mb="600"
      borderTopLeftRadius={connectWithTop ? 0 : 'rounded'}
      borderTopRightRadius={connectWithTop ? 0 : 'rounded'}
    >
      <CopyToClipboard text={code} onCopy={onCopy}>
        <Copy position="absolute" right="-4px" top="-2px" as="button">
          <Box as="span" fontSize="100" lineHeight="400" fontWeight="medium">
            {copied ? 'Copied' : 'Copy'}
          </Box>
        </Copy>
      </CopyToClipboard>
      <Box overflow="scroll" minHeight="140px" maxHeight="600px" p="500">
        <SyntaxHighlighter
          language={language || 'text'}
          style={colorScheme === 'light' ? a11yLight : a11yDark}
          customStyle={{
            background: 'transparent'
          }}
        >
          {formatted}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
}

export default CodeBlock;
