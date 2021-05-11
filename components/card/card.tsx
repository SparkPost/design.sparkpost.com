import Link from 'next/link';
import { Box } from '@sparkpost/matchbox';
import { PortableText } from '@lib/sanity';
import { ArrowForward } from '@sparkpost/matchbox-icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const hoverAnimation = {
  x: -12,
  y: -12
};

const MotionBox = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  ${(props) => `
        background-color: ${props.theme.colors.white};
        padding: ${props.theme.space['600']};
        border: 1px solid ${props.theme.colors.gray['900']};
    `}
`;

type CardProps = {
  url: string;
  span: number;
  content: Array<any>;
};

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { url, span, content } = props;

  return (
    <Link href={url || ''}>
      <Box
        gridColumn={['span 10', null, `span ${span}`]}
        pb={['40%', null, '72%', '60%', '38%']}
        position="relative"
        ml="-1px"
        mt="-1px"
      >
        <Box position="absolute" width="100%" height="100%" top="0" left="0" bg="blue.700" />
        <MotionBox whileHover={hoverAnimation}>
          <PortableText blocks={content} />
          {url && <ArrowForward />}
        </MotionBox>
      </Box>
    </Link>
  );
};

export default Card;
