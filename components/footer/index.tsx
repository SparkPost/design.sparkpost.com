import React from 'react';
import { Box } from '@sparkpost/matchbox';
import styled from 'styled-components';

type ItemProps = {
  url: string;
  title: string;
};

type FooterProps = {
  items?: ItemProps[];
};

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

function Footer(props: FooterProps): JSX.Element {
  const { items } = props;

  return (
    <Box
      as="footer"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.1000"
      p="600"
      mt="-1px"
    >
      <Ul>
        {items.map((item, i) => (
          <Item {...item} key={i} />
        ))}
      </Ul>
      <Box fontSize="100" color="gray.700" pt="800" mt="800">
        SparkPost © {new Date().getFullYear()}. All Rights Reserved.
      </Box>
    </Box>
  );
}

const Li = styled.li`
  list-style-type: none;
  padding: 0;
  margin: 0;

  a,
  a:visited {
    color: ${({ theme }) => theme.colors.gray[1000]};
  }
`;

function Item(props: ItemProps): JSX.Element {
  return (
    <Li>
      <Box as="a" fontSize="300" href={props.url}>
        {props.title}
      </Box>
    </Li>
  );
}

export default Footer;
