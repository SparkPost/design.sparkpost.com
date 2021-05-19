import React from 'react';
import { Box } from '@sparkpost/matchbox';
import Link from 'next/link';
import styled from 'styled-components';
import css from '@styled-system/css';
import { useRouter } from 'next/router';

type SidebarProps = {
  enabled?: boolean;
  root: string;
  items: {
    title: string;
    slug: string;
    subcategory: string;
  }[];
};

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const SyledLink = styled.a`
  text-decoration: none;
  display: block;
  ${css({
    pl: '200',
    py: '50',
    color: 'scheme.fg',
    fontSize: '200'
  })}

  &:hover {
    ${css({
      bg: 'scheme.lightAccent',
      color: 'scheme.fg'
    })}
  }
`;

type CategoryLabel = {
  children: React.ReactNode;
};

function CategoryLabel(props: CategoryLabel): JSX.Element {
  return (
    <Box mb="100" mt="300" pl="200" fontSize="100" fontWeight="500" color="scheme.fg">
      {props.children}
    </Box>
  );
}

function Sidebar(props: SidebarProps): JSX.Element {
  const { enabled, items, root } = props;
  const router = useRouter();

  if (!enabled) {
    return null;
  }

  // Finds links that belong to the root, these are rendered first before subcategories
  const rootItems = items.filter(({ subcategory }) => !subcategory || subcategory === root);

  // Finds links with a defined subcategory that dont belong to the root
  const itemsWithCategory = items.filter(
    ({ subcategory }) => !!subcategory && subcategory !== root
  );

  // Creates an array of the categories
  const categories = itemsWithCategory.map(({ subcategory }) => subcategory || root);
  const dedupedCategories = categories.filter((sub, i) => categories.indexOf(sub) === i);

  return (
    <Box as="nav" border="thick" mr="-2px" mt="-2px">
      <CategoryLabel>{root}</CategoryLabel>
      <Ul>
        {rootItems.map((item, i) => {
          return (
            <li key={i}>
              <Link href={item.slug}>
                <SyledLink isActive={router.asPath === item.slug}>{item.title}</SyledLink>
              </Link>
            </li>
          );
        })}
      </Ul>
      {dedupedCategories.map((cat) => {
        return (
          <Box>
            <CategoryLabel>{cat}</CategoryLabel>
            <Ul>
              {itemsWithCategory
                .filter(({ subcategory }) => subcategory === cat)
                .map((item, i) => {
                  return (
                    <li key={i}>
                      <Link href={item.slug}>
                        <SyledLink isActive={router.asPath === item.slug}>{item.title}</SyledLink>
                      </Link>
                    </li>
                  );
                })}
            </Ul>
          </Box>
        );
      })}
    </Box>
  );
}

export default Sidebar;
