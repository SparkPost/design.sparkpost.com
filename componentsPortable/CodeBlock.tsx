import { useContext } from 'react';
import { Box, styles, useCopyToClipboard } from '@sparkpost/matchbox';
import SyntaxHighlighter from 'react-syntax-highlighter';
import styled from 'styled-components';
import { ColorSchemeContext } from '@context/ColorSchemeContext';
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

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

  const { colorScheme } = useContext(ColorSchemeContext);
  const { copy, copied } = useCopyToClipboard();

  if (!code) {
    return null;
  }

  return (
    <Box
      border="thick"
      borderRadius="rounded"
      position="relative"
      overflow="hidden"
      mb="600"
      width="100%"
      borderTopLeftRadius={connectWithTop ? 0 : 'rounded'}
      borderTopRightRadius={connectWithTop ? 0 : 'rounded'}
    >
      <Copy position="absolute" right="-4px" top="-2px" as="button" onClick={() => copy(code)}>
        <Box as="span" fontSize="100" lineHeight="400" fontWeight="medium">
          {copied ? 'Copied' : 'Copy'}
        </Box>
      </Copy>
      <Box
        overflow="scroll"
        minHeight="140px"
        maxHeight="600px"
        p="500"
        width="100%"
        display="flex"
        alignItems="center"
      >
        <SyntaxHighlighter
          language={language || 'text'}
          style={colorScheme === 'light' ? a11yLight : a11yDark}
          wrapLines={true}
          customStyle={{
            background: 'transparent'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
}

export default CodeBlock;
