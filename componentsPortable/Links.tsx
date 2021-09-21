import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import css from '@styled-system/css';

const StyledLink = styled.a`
  &,
  &:visited {
    ${css({
      color: 'scheme.fg'
    })}
  }

  &:hover {
    ${css({
      color: 'scheme.heavyAccent'
    })}
  }

  transition: ${({ theme }) => theme?.motion?.duration.fast};
`;

type LinkProps = {
  mark: {
    slug?: string;
    href?: string;
  };
  children: React.ReactNode;
};

function InternalLink(props: LinkProps): JSX.Element {
  return (
    <Link href={props?.mark?.slug} passHref>
      <StyledLink>{props.children}</StyledLink>
    </Link>
  );
}

function ExternalLink(props: LinkProps): JSX.Element {
  return (
    <StyledLink href={props?.mark?.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </StyledLink>
  );
}

export { InternalLink, ExternalLink };
