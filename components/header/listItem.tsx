import { useRouter } from 'next/router';
import { Box } from '@sparkpost/matchbox';
import Link from 'next/link';
import styled from 'styled-components';
import css from '@styled-system/css';

export type MenuItems = {
  title: string;
  slug: string;
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

  ${css({
    width: ['calc(100% + 4px)', null, null, null, 'auto'],
    color: 'scheme.fg',
    '&:visited': {
      color: 'scheme.fg'
    }
  })}

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
      <Link href={slug} passHref>
        <StyledNavLink
          as="a"
          px={['600', null, null, null, '450']}
          py="450"
          fontSize={['400', null, null, null, '200']}
          fontWeight="500"
          isActive={router.asPath.includes(slug)}
        >
          {title}
        </StyledNavLink>
      </Link>
    </Box>
  );
};

export default ListItem;
