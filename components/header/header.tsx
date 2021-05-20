import React from 'react';
import { Box, styles } from '@sparkpost/matchbox';
import { InvertColors } from '@sparkpost/matchbox-icons';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ColorSchemeContext } from '../../context/ColorSchemeContext';

type MenuItems = {
  title: string;
  slug: string;
};

type HeaderProps = {
  title: string;
  items?: MenuItems[];
};

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
`;

const StyledInput = styled.input`
  appearance: none;
  border: none;
  outline: none;

  ${(props) => `
        font-size: ${props.theme.fontSize_400};
    `}
`;

const StyledHomeLink = styled(Box)`
  text-decoration: none;
  color: white;
  transition: ${(props) => props.theme.motion.duration.fast};

  &,
  &:visited {
    &:hover {
      color: white;
      background: ${(props) => props.theme.colors.scheme.heavyAccent};
    }
  }
`;

const SchemeButton = styled.button`
  ${styles.buttonReset}
  pointer: cursor;
  padding: ${(props) => props.theme.space[400]};
`;

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, items } = props;
  const { toggle } = React.useContext(ColorSchemeContext);
  return (
    <Box as="header" border="thick" display="flex" alignItems="center" bg="scheme.bg">
      <Link href="/">
        <StyledHomeLink
          as="a"
          display="inline-block"
          height="100%"
          bg="gray.1000"
          fontSize="400"
          fontWeight="500"
          pr="100px"
          pl="400"
          py="450"
          borderX="thick"
          ml="-2px"
        >
          {title}
        </StyledHomeLink>
      </Link>
      <StyledList>
        {items?.map((item, index) => {
          return <ListItem {...item} key={index} />;
        })}
      </StyledList>
      <SchemeButton onClick={toggle} type="button">
        <InvertColors />
      </SchemeButton>
      <Box px="600" borderX="thick" py="450" mr="-2px">
        <StyledInput type="text" placeholder="Search" width="500"></StyledInput>
      </Box>
    </Box>
  );
};

const StyledNavLink = styled(Box)`
  display: inline-block;
  margin-top: -2px;
  margin-bottom: -2px;
  margin-left: -2px;
  color: ${(props) => props.theme.colors.scheme.fg};
  text-decoration: none;
  border: 2px solid transparent;
  transition: ${(props) => props.theme.motion.duration.fast};

  &:hover {
    background: ${(props) => props.theme.colors.scheme.lightAccent};
    border: ${(props) => props.theme.borders.thick};
    color: ${(props) => props.theme.colors.scheme.fg};
  }

  ${({ isActive, theme }) => {
    if (isActive) {
      return `
      background: ${theme.colors.scheme.lightAccent};
      border: ${theme.borders.thick};
      `;
    }
  }}
`;

const ListItem: React.FC<MenuItems> = (props: MenuItems) => {
  const { title, slug } = props;
  const router = useRouter();

  return (
    <Box as="li" display="inline-block">
      <Link href={slug}>
        <StyledNavLink
          as="a"
          px="450"
          py="450"
          fontSize="200"
          fontWeight="500"
          isActive={router.asPath === slug}
        >
          {title}
        </StyledNavLink>
      </Link>
    </Box>
  );
};

export default Header;
