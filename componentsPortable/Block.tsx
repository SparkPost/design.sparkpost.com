import React from 'react';
import { Box } from '@sparkpost/matchbox';
import { Link as LinkIcon } from '@sparkpost/matchbox-icons';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import css from '@styled-system/css';

type HeaderProps = {
  level: string;
  children: string | React.ReactNode | number;
  disableLinks?: boolean;
};

const StyledLink = styled.a`
  text-decoration: none;
  &,
  &:hover,
  &:visited {
    ${css({
      color: 'scheme.fg'
    })}
  }
  svg {
    opacity: 0;
    margin-top: -2px;
    transition: 0.15s;
  }

  &:hover svg {
    opacity: 1;
  }
`;

export function Header(props: HeaderProps): JSX.Element {
  const { level, children = '' } = props;
  const router = useRouter();

  const mb = level === '1' || level === '2' ? '400' : '200';

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

  function toKebab(str: string): string {
    if (!str || typeof str !== 'string') {
      return '';
    }
    return str.replace(/\s+/g, '-').toLowerCase();
  }

  const path = router.asPath.split('#')[0];
  return (
    <Box as={`h${level}`} mb={mb} pt="300" fontSize={size} id={toKebab(children[0])}>
      {!props.disableLinks ? (
        <StyledLink href={`${path}#${toKebab(children[0])}`}>
          {children} <LinkIcon />
        </StyledLink>
      ) : (
        children
      )}
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
      <Box bg="scheme.lightFg" width="3px" borderRadius="pill"></Box>
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
  disableLinks?: boolean;
};

// This component is reponsible for rendering default Sanity blocks – paragraphs and headers and blockquotes
function Block(props: BlockProps): JSX.Element {
  const style = props?.node?.style || 'normal';

  // This is a header
  if (/^h\d/.test(style)) {
    return (
      <Header level={style.replace(/[^\d]/g, '')} disableLinks={props.disableLinks}>
        {props.children}
      </Header>
    );
  }

  if (style === 'blockquote') {
    return <BlockQuote>{props.children}</BlockQuote>;
  }

  return (
    <Box as="p" fontSize="300" lineHeight="300" mb="500">
      {props.children}
    </Box>
  );
}

export default Block;
