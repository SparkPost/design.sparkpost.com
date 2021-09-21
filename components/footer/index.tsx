import React from 'react';
import { Box } from '@sparkpost/matchbox';
import styled from 'styled-components';
import pkg from '../../package.json';

type ItemProps = {
  slug: string;
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
    <Box as="footer" border="thick" p="600" mt="-2px">
      <Ul>{items && items.map((item, i) => <Item {...item} key={i} />)}</Ul>
      <Box fontSize="100" color="scheme.fg" pt="800" mt="800">
        This site is running on <strong>matchbox@{pkg.dependencies['@sparkpost/matchbox']}</strong>.
      </Box>
      <Box fontSize="100" color="scheme.fg">
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
    color: ${({ theme }) => theme?.colors?.scheme.fg};
  }
`;

function Item(props: ItemProps): JSX.Element {
  return (
    <Li>
      <Box as="a" fontSize="300" href={props.slug}>
        {props.title}
      </Box>
    </Li>
  );
}

export default Footer;
