import { useState } from 'react';
import Link from 'next/link';
import { Box } from '@sparkpost/matchbox';
import { tokens } from '@sparkpost/design-tokens';
import { PortableText } from '@lib/sanity';
import { ArrowForward } from '@sparkpost/matchbox-icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import css from '@styled-system/css';

const categoryMap = {
  Foundations: {
    bg: tokens.color_purple_300,
    fg: tokens.color_purple_800
  },
  Components: {
    bg: tokens.color_yellow_300,
    fg: tokens.color_yellow_800
  },
  Updates: {
    bg: tokens.color_teal_300,
    fg: tokens.color_teal_800
  },
  Content: {
    bg: tokens.color_green_400,
    fg: tokens.color_green_900
  },
  Resources: {
    bg: tokens.color_magenta_400,
    fg: tokens.color_magenta_900
  }
};

const hoverAnimation = (index: number, span: number) => {
  return {
    active: {
      x: (index * span) % 12 === 0 ? 12 : -12,
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

const NegateMargins = styled.div`
  * {
    margin-bottom: 0;
    padding-top: 0;
  }
`;

type CardProps = {
  url: string;
  title?: string;
  span: number;
  index?: number; // Used to animate to the right instead of left
  content?: Array<any>;
  subtitle?: string;
  category?: string;
};

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { url, span, index, content, title, subtitle, category } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={url || ''}>
      <BorderBox
        gridColumn={['span 12', null, `span ${span}`]}
        pb={span === 12 ? ['25%'] : ['40%', null, '82%', '60%', '44%']}
        minHeight="15rem"
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
          {category && (
            <Box
            // position={['bloc', null, null, null, 'absolute']}
            // right={[null, null, '600']}
            // top={[null, null, '600']}
            >
              <Box
                fontSize="50"
                lineHeight="100"
                fontWeight="500"
                mb="200"
                bg={categoryMap[category]?.bg}
                color={categoryMap[category]?.fg}
                borderRadius="2px"
                display="inline-block"
                px="100"
                py="0"
              >
                {category.toUpperCase()}
              </Box>
            </Box>
          )}
          {title && (
            <Box fontSize="300" fontWeight="500" mb="200">
              {title}
            </Box>
          )}
          {subtitle && (
            <Box fontSize="200" mb="200">
              {subtitle}
            </Box>
          )}
          {content && (
            <NegateMargins>
              <PortableText blocks={content} />
            </NegateMargins>
          )}
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
