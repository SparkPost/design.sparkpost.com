import { useState } from 'react';
import Link from 'next/link';
import { Box } from '@sparkpost/matchbox';
import { PortableText } from '@lib/sanity';
import { ArrowForward } from '@sparkpost/matchbox-icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const hoverAnimation = (index: number) => {
  return {
    active: {
      x: index === 0 ? 12 : -12,
      y: -12,
      zIndex: index === 0 ? 2 : 1
    },
    inActive: {
      x: 0,
      y: 0,
      zIndex: 1,
      transitionEnd: {
        zIndex: 0
      }
    }
  };
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
        border: 1px solid ${props.theme.colors.gray['1000']};
        cursor: ${props.url ? 'pointer' : ''};
    `}
`;

type CardProps = {
  url: string;
  span: number;
  index: number;
  content: Array<any>;
};

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { url, span, index, content } = props;
  const [isHovered, setIsHovered] = useState(false);

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
        <MotionBox
          url={url}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={
            url ? (isHovered ? hoverAnimation(index).active : hoverAnimation(index).inActive) : ''
          }
          transition={{
            ease: 'easeInOut',
            duration: 0.2
          }}
        >
          <PortableText blocks={content} />
          {url && <ArrowForward />}
        </MotionBox>
      </Box>
    </Link>
  );
};

export default Card;
