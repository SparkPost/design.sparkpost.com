import { Box } from '@sparkpost/matchbox';

type HomeHeroProps = {
  title: string;
  description: string;
};

const HomeHero: React.FC<HomeHeroProps> = (props: HomeHeroProps) => {
  const { title, description } = props;

  return (
    <Box
      display="grid"
      py="125px"
      px="600"
      borderLeftWidth="1px"
      borderLeftStyle="solid"
      borderLeftColor="gray.1000"
      borderRightWidth="1px"
      borderRightStyle="solid"
      borderRightColor="gray.1000"
    >
      <Box
        mx="auto"
        my="0"
        maxWidth="952px"
        display="grid"
        gridTemplateColumns={['1fr', null, 'repeat(2, 1fr)']}
      >
        <Box
          as="h1"
          fontSize="600"
          lineHeight="600"
          fontWeight="medium"
          pr="500"
          pb={['500', null]}
        >
          {title}
        </Box>
        <Box as="p" fontSize="600" lineHeight="600">
          {description}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeHero;
