import { Box } from '@sparkpost/matchbox';
import styled from 'styled-components';

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
      <Box
        as="span"
        display="inline-block"
        p="450"
        bg="gray.1000"
        color="white"
        fontSize="500"
        fontWeight="600"
        pr="100px"
      >
        {title}
      </Box>
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

const StyledItem = styled(Box)`
  display: inline-block;

  a,
  a:visited {
    color: ${(props) => props.theme.colors.gray['1000']};
    text-decoration: none;
  }
`;

const ListItem: React.FC<MenuItems> = (props: MenuItems) => {
  const { title, url } = props;

  return (
    <StyledItem as="li" px="500">
      <Box as="a" href={url}>
        {title}
      </Box>
    </StyledItem>
  );
};

export default Header;
