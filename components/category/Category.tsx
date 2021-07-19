import React from 'react';
import { Box } from '@sparkpost/matchbox';
import { tokens } from '@sparkpost/design-tokens';

export const categoryColors = {
  foundations: {
    bg: tokens.color_purple_300,
    fg: tokens.color_purple_800
  },
  components: {
    bg: tokens.color_yellow_300,
    fg: tokens.color_yellow_800
  },
  updates: {
    bg: tokens.color_teal_300,
    fg: tokens.color_teal_800
  },
  content: {
    bg: tokens.color_green_400,
    fg: tokens.color_green_900
  },
  resources: {
    bg: tokens.color_magenta_400,
    fg: tokens.color_magenta_900
  },
  patterns: {
    bg: tokens.color_blue_400,
    fg: tokens.color_blue_900
  }
};

type CategoryProps = {
  category: string;
};

function Category(props: CategoryProps): JSX.Element {
  const { category } = props;
  return (
    <Box
      fontSize="50"
      lineHeight="100"
      fontWeight="500"
      mb="200"
      bg={categoryColors[category]?.bg}
      color={categoryColors[category]?.fg}
      borderRadius="2px"
      display="inline-block"
      px="100"
      py="0"
    >
      {category.toUpperCase()}
    </Box>
  );
}

export default Category;
