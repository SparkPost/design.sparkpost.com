import { Box } from '@sparkpost/matchbox';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

type MenuItems = {
  title: string;
  url: string;
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
  border-right: 1px solid ${(props) => props.theme.colors.gray['1000']};
  color: white;
  transition: ${(props) => props.theme.motion.duration.fast};

  &,
  &:visited {
    &:hover {
      color: white;
      background: ${(props) => props.theme.colors.blue[700]};
    }
  }
`;

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, items } = props;

  return (
    <Box
      as="header"
      borderWidth="100"
      borderStyle="solid"
      borderColor="gray.1000"
      display="flex"
      alignItems="center"
    >
      <Link href="/">
        <StyledHomeLink
          as="a"
          display="inline-block"
          height="100%"
          bg="gray.1000"
          color="white"
          fontSize="400"
          fontWeight="500"
          pr="100px"
          pl="400"
          py="450"
        >
          {title}
        </StyledHomeLink>
      </Link>
      <StyledList>
        {items?.map((item, index) => {
          return <ListItem {...item} key={index} />;
        })}
      </StyledList>
      <Box
        px="600"
        borderLeftWidth="1px"
        borderLeftStyle="solid"
        borderLeftColor="gray.1000"
        height="100%"
      >
        <StyledInput type="text" placeholder="Search"></StyledInput>
      </Box>
    </Box>
  );
};

const StyledNavLink = styled(Box)`
  display: inline-block;
  margin-top: -1px;
  margin-bottom: -1px;
  margin-left: -1px;
  color: ${(props) => props.theme.colors.gray['1000']};
  text-decoration: none;
  border: 1px solid transparent;
  transition: ${(props) => props.theme.motion.duration.fast};

  &:hover {
    background: ${(props) => props.theme.colors.blue['200']};
    border: 1px solid ${(props) => props.theme.colors.gray['1000']};
  }

  ${({ isActive, theme }) => {
    if (isActive) {
      return `
      background: ${theme.colors.blue['200']};
      border: 1px solid ${theme.colors.gray['1000']};
      `;
    }
  }}
`;

const ListItem: React.FC<MenuItems> = (props: MenuItems) => {
  const { title, url } = props;
  const router = useRouter();

  return (
    <Box as="li" display="inline-block">
      <Link href={url}>
        <StyledNavLink
          as="a"
          px="450"
          py="450"
          fontSize="200"
          fontWeight="500"
          isActive={router.asPath === url}
        >
          {title}
        </StyledNavLink>
      </Link>
    </Box>
  );
};

export default Header;
