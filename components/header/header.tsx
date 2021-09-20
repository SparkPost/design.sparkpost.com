import React, { useState } from 'react';
import { Box, BoxProps, ScreenReaderOnly, styles } from '@sparkpost/matchbox';
import { InvertColors } from '@sparkpost/matchbox-icons';
import styled from 'styled-components';
import css from '@styled-system/css';
import Link from 'next/link';
import { ColorSchemeContext } from '../../context/ColorSchemeContext';
import { Search } from '@components/search';
import { MenuIcon } from '@components/menuIcon';
import MobileMenu from './mobileMenu';
import ListItem, { MenuItems } from './listItem';

type HeaderProps = {
  title: string;
  items?: MenuItems[];
};

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;

  ${css({
    display: ['none', null, null, null, 'block']
  })}
`;

const StyledHomeLink = styled(Box)<BoxProps>`
  text-decoration: none;
  color: white;
  transition: ${(props) => props.theme.motion.duration.fast};

  &,
  &:visited {
    color: white;
    &:hover {
      color: white;
      background: ${(props) => props.theme.colors.scheme.heavyAccent};
    }
  }
`;

const SchemeButton = styled.button`
  ${styles.buttonReset}
  cursor: pointer;
  padding: ${(props) => props.theme.space[400]} ${(props) => props.theme.space[300]};
`;

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, items } = props;
  const { toggle } = React.useContext(ColorSchemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box
        as="header"
        border="thick"
        display="flex"
        alignItems="center"
        bg="scheme.bg"
        justifyContent="space-between"
        position={['sticky', null, null, null, 'relative']}
        top="0"
        zIndex="100"
      >
        <Link href="/" passHref>
          <StyledHomeLink
            as="a"
            display="inline-block"
            height="100%"
            bg="gray.1000"
            fontSize="400"
            fontWeight="500"
            pr={['400', null, null, null, '100px']}
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
        <MobileMenu id="MainMenu" isOpen={isOpen}>
          {items?.map((item, index) => {
            return <ListItem {...item} key={index} />;
          })}
        </MobileMenu>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          position="relative"
          height="100%"
        >
          <SchemeButton onClick={toggle} type="button">
            <ScreenReaderOnly>Change Theme</ScreenReaderOnly>
            <InvertColors />
          </SchemeButton>
          <MenuIcon aria-controls="MainMenu" isOpen={isOpen} toggleMenu={toggleMenu} />
          <Box borderX="thick" mr="-2px" display={['none', null, 'block']}>
            <Search />
          </Box>
        </Box>
      </Box>
      <Box borderX="thick" borderBottom="thick" display={['block', null, 'none']}>
        <Search />
      </Box>
    </>
  );
};

export default Header;
