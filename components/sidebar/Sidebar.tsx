import React from 'react';
import { Box, styles, Drawer, useDrawer } from '@sparkpost/matchbox';
import Link from 'next/link';
import styled from 'styled-components';
import css from '@styled-system/css';
import { useRouter } from 'next/router';
import { ChevronRight, ChevronLeft } from '@sparkpost/matchbox-icons';
import NoSSR from 'react-no-ssr';

type SidebarProps = {
  enabled?: boolean;
  root: string;
  activePage?: string;
  items: {
    title: string;
    slug: string;
    subcategory?: string;
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
    py: ['100', null, '50'],
    color: 'scheme.fg',
    fontSize: '200'
  })}

  &:hover {
    ${css({
      bg: 'scheme.lightAccent',
      color: 'scheme.fg'
    })}
  }

  ${({ isActive, theme }) =>
    isActive
      ? `
        background: ${theme.colors.scheme.lightAccent};
        color: ${theme.colors.scheme.heavyAccent};
        font-weight: 500;
  `
      : ''}
`;

type CategoryLabelProps = {
  children: React.ReactNode;
};

function CategoryLabel(props: CategoryLabelProps): JSX.Element {
  return (
    <Box mb="100" pl="200" fontSize={['300', null, '100']} fontWeight="500" color="scheme.fg">
      {props.children}
    </Box>
  );
}

const ChevronButton = styled.button`
  ${styles.buttonReset}
  ${css({
    p: 200,
    '&:focus': {
      border: 'none',
      outline: 'none',
      bg: 'scheme.lightAccent'
    }
  })}
`;

type BreadcrumbProps = {
  category: string;
  activePage: string;
  getActivatorProps: () => object;
};

function Breadcrumbs(props: BreadcrumbProps): JSX.Element {
  const { category, activePage, getActivatorProps } = props;
  return (
    <Box
      px="400"
      bg="scheme.bg"
      display={['flex', null, 'none']}
      justifyContent="space-between"
      alignItems="center"
      border="thick"
      borderTop="none"
      fontSize="100"
      fontWeight="medium"
      color="scheme.fg"
    >
      <span>
        {category} <ChevronRight size="16" />{' '}
        <Box as="span" color="scheme.heavyAccent">
          {activePage}
        </Box>
      </span>
      <ChevronButton {...getActivatorProps()}>
        <ChevronLeft size="24" />
      </ChevronButton>
    </Box>
  );
}

function Sidebar(props: SidebarProps): JSX.Element {
  const { enabled, items, root, activePage } = props;
  const { getDrawerProps, getActivatorProps } = useDrawer();

  const formatString = (string) => {
    if (!string) {
      return string;
    }

    return string.split('-').join(' ');
  };

  return (
    <>
      <NoSSR>
        <Box display={['none', null, 'block']} position="sticky" top="0" maxHeight="100vh">
          <SidebarList enabled={enabled} items={items} root={root} />
        </Box>
        <Box display={['block', null, 'none']} position="sticky" top="68px">
          {activePage && (
            <Breadcrumbs
              category={root}
              activePage={formatString(activePage)}
              getActivatorProps={getActivatorProps}
            />
          )}
          <Drawer {...getDrawerProps()} position="right">
            <Drawer.Header />
            <Drawer.Content p="0">
              <Box
                position="fixed"
                width="100%"
                height="100%"
                border="thick"
                top="0"
                left="0"
                style={{ pointerEvents: 'none' }}
              />
              <SidebarList enabled={enabled} items={items} root={root} />
            </Drawer.Content>
          </Drawer>
        </Box>
      </NoSSR>
    </>
  );
}

function SidebarList(props: SidebarProps): JSX.Element {
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
    <Box border={['none', null, 'thick']} mr="-2px" mt="-2px" borderBottom="none">
      {/* Height calculation here is a hack to fix odd scrolling behavior. Should probably fix in <Drawer /> component */}
      <Box maxHeight={['calc(100vh - 77px)', null, '100vh']} overflow="auto">
        <Box as="nav">
          <Box py="400" px={['400', null, '0']}>
            <CategoryLabel>{root}</CategoryLabel>
            <Ul>
              {rootItems.map((item, i) => {
                const href = item.slug.includes('/components') ? `${item.slug}/api` : item.slug;
                return (
                  <li key={i}>
                    <Link href={href}>
                      <SyledLink isActive={router.asPath.includes(item.slug)}>
                        {item.title}
                      </SyledLink>
                    </Link>
                  </li>
                );
              })}
            </Ul>
          </Box>
          {dedupedCategories.map((cat, i) => {
            return (
              <Box border="thick" m="-2px" py="300" px={['400', null, '0']} key={i}>
                <CategoryLabel>{cat}</CategoryLabel>
                <Ul>
                  {itemsWithCategory
                    .filter(({ subcategory }) => subcategory === cat)
                    .map((item, i) => {
                      const href = item.slug.includes('/components')
                        ? `${item.slug}/api`
                        : item.slug;
                      return (
                        <li key={i}>
                          <Link href={href}>
                            <SyledLink isActive={router.asPath.includes(item.slug)}>
                              {item.title}
                            </SyledLink>
                          </Link>
                        </li>
                      );
                    })}
                </Ul>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
