import React from 'react';
import Link from 'next/link';
import { Box } from '@sparkpost/matchbox';
import { PortableText } from '@lib/sanity';
import { ArrowForward } from '@sparkpost/matchbox-icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import css from '@styled-system/css';
import { formatDate } from '@utils/date';
import { Category, categoryColors } from '@components/category';

// Turns block content into plain text
function toPlainText(blocks = []) {
  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children or if it is a header,
        // return nothing
        if (block._type !== 'block' || !block.children || /^h\d/.test(block.style)) {
          return '';
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join('');
      })
      // join the paragraphs leaving split by two linebreaks
      .join('\n\n')
  );
}

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
  margin-top: -1px;
  margin-left: -1px;
  margin-bottom: -1px;
  margin-right: -1px;
`;

const NegateMargins = styled.div`
  * {
    margin-bottom: 0;
    padding-top: 0;
    pointer-events: none;
  }
`;

type CardProps = {
  content?: Array<any>;
  date?: string;
  enableCategory?: boolean;
  excerpt?: object[];
  index?: number; // Used to animate to the right instead of left
  span: number;
  subtitle?: string;
  title?: string;
  url: string;
};

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { url, span, index, content, title, subtitle, enableCategory, date, excerpt } = props;
  const [isHovered, setIsHovered] = React.useState(false);

  const category = React.useMemo(() => {
    if (!url) {
      return '';
    }
    return url.split('/')?.[1];
  }, []);

  const accentColor = React.useMemo(() => {
    if (!url) {
      return 'scheme.heavyAccent';
    }

    return categoryColors[category]?.bg || 'scheme.heavyAccent';
  }, [category]);

  const Wrapper = url ? Link : React.Fragment;

  return (
    <Wrapper href={url || undefined}>
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
          bg={accentColor}
          border="thick"
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
          {enableCategory && url && <Category category={category} />}
          {date && (
            <Box fontSize="100" mb="0" lineHeight="100">
              {formatDate(date)}
            </Box>
          )}
          {title && (
            <Box fontSize="300" fontWeight="500" mb="200">
              {title}
            </Box>
          )}
          {subtitle && (
            <Box fontSize="200" lineHeight="200" mb="200">
              {subtitle}
            </Box>
          )}
          {excerpt && (
            <Box fontSize="200" lineHeight="200" mb="200">
              {toPlainText(excerpt).substring(0, 180)}
              {toPlainText(excerpt).substring(0, 180).length > 179 ? '...' : ''}
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
    </Wrapper>
  );
};

export default Card;
