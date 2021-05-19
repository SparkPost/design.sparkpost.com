import { useState } from 'react';
import Link from 'next/link';
import { Box } from '@sparkpost/matchbox';
import { PortableText } from '@lib/sanity';
import { ArrowForward } from '@sparkpost/matchbox-icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import css from '@styled-system/css';

const hoverAnimation = (index: number, span: number) => {
  return {
    active: {
      x: (index * span) % 10 === 0 ? 12 : -12,
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
  ${css({
    bg: 'scheme.bg',
    p: ['300', null, null, '400', '600'],
    border: 'thick'
  })}
  ${(props) => `cursor: ${props.url ? 'pointer' : ''};`}
`;

const BorderBox = styled(Box)`
  margin-top: -2px;
  margin-left: -2px;
  margin-bottom: -2px;
  margin-right: -2px;
`;

type CardProps = {
  url: string;
  title?: string;
  span: number;
  index?: number; // Used to animate to the right instead of left
  content?: Array<any>;
};

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { url, span, index, content, title } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={url || ''}>
      <BorderBox
        gridColumn={['span 10', null, `span ${span}`]}
        pb={span === 10 ? ['25%'] : ['40%', null, '82%', '60%', '54%']}
        position="relative"
      >
        <Box
          position="absolute"
          width="100%"
          height="100%"
          top="0"
          left="0"
          bg="scheme.heavyAccent"
        />
        <MotionBox
          url={url}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          p={['200', null, '600']}
          animate={
            url
              ? isHovered
                ? hoverAnimation(index, span).active
                : hoverAnimation(index, span).inActive
              : ''
          }
          transition={{
            ease: 'easeInOut',
            duration: 0.2
          }}
        >
          {title && (
            <Box fontSize="300" fontWeight="500">
              {title}
            </Box>
          )}
          {content && <PortableText blocks={content} />}
          {url && (
            <Box mt="100">
              <ArrowForward />
            </Box>
          )}
        </MotionBox>
      </BorderBox>
    </Link>
  );
};

export default Card;
