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
        border: ${props.theme.borders.thick};
        cursor: ${props.url ? 'pointer' : ''};
    `}
`;

const BorderBox = styled(Box)`
  margin-bottom: -2px;
  &:not(:first-child) {
    margin-left: -2px;
  }
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
      <BorderBox
        gridColumn={['span 10', null, `span ${span}`]}
        pb={['40%', null, '82%', '60%', '42%']}
        position="relative"
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
          {url && (
            <Box mt="200">
              <ArrowForward />
            </Box>
          )}
        </MotionBox>
      </BorderBox>
    </Link>
  );
};

export default Card;
