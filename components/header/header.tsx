import { Box } from '@sparkpost/matchbox';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title } = props;

  return (
    <Box as="header" borderWidth="100" borderStyle="solid" borderColor="gray.1000">
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
    </Box>
  );
};

export default Header;
