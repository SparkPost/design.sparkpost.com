import React from 'react';
import { Box } from '@sparkpost/matchbox';

type HeaderProps = {
  level: string;
  children: React.ReactNode;
};

function Header(props: HeaderProps): JSX.Element {
  const { level, children } = props;

  const mb = level === '1' || level === '2' ? '600' : '500';

  const size = React.useMemo(() => {
    switch (level) {
      case '1':
        return '700';
      case '2':
        return '600';
      case '3':
        return '500';
      case '4':
        return '400';
      default:
        break;
    }
  }, [level]);

  return (
    <Box as={`h${level}`} mb={mb} pt="300" fontSize={size}>
      {children}
    </Box>
  );
}

type BlockQuoteProps = {
  children: React.ReactNode;
};

function BlockQuote(props: BlockQuoteProps): JSX.Element {
  const { children } = props;

  return (
    <Box as="blockquote" display="flex" p="0" m="0" mb="600">
      <Box bg="scheme.fg" width="3px" borderRadius="pill"></Box>
      <Box pl="400" py="300" fontSize="400" lineHeight="500" fontStyle="italic" color="scheme.fg">
        {children}
      </Box>
    </Box>
  );
}

type BlockProps = {
  node: {
    style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
  };
  children: React.ReactNode;
};

// This component is reponsible for rendering default Sanity blocks – paragraphs and headers and blockquotes
function Block(props: BlockProps): JSX.Element {
  const style = props.node.style || 'normal';

  // This is a header
  if (/^h\d/.test(style)) {
    return <Header level={style.replace(/[^\d]/g, '')}>{props.children}</Header>;
  }

  if (style === 'blockquote') {
    return <BlockQuote>{props.children}</BlockQuote>;
  }

  return (
    <Box as="p" fontSize="300" lineHeight="300" mb="600">
      {props.children}
    </Box>
  );
}

export default Block;
