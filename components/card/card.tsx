import React from 'react';
import Link from 'next/link';
import { Box } from '@sparkpost/matchbox';
import { SimplePortableText } from '@lib/sanity';
import { ArrowForward } from '@sparkpost/matchbox-icons';
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

const HoverBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: translate3d(0, 0, 0);
  transition: transform 200ms ease-in-out, z-index 200ms linear;
  z-index: 0;

  ${({ url, index }) => {
    return `
      cursor: ${url ? 'pointer' : ''};
      &:hover {
        transition: transform 200ms ease-in-out, z-index 200ms linear;
        z-index: ${url ? (index === 0 ? 2 : 1) : 0};
      }
    `;
  }};

  ${({ index, span, url }) =>
    css({
      bg: 'scheme.bg',
      p: ['300', null, null, '400', '600'],
      border: 'thick',
      'user-select': ['none', null, 'inherit'],
      '&:hover, &:active': {
        transform: [
          `translate3d(0, 0, 0)`,
          null,
          url
            ? `translate3d(${(index * span) % 12 === 0 ? '12px' : '-12px'}, -12px, 0)`
            : 'translate3d(0, 0, 0)'
        ]
      }
    })}
`;

const BorderBox = styled(Box)`
  margin-top: -1px;
  margin-left: -1px;
  margin-bottom: -1px;
  margin-right: -1px;
  text-decoration: none;
  display: block;

  &,
  &:visited,
  &:hover {
    ${css({ color: 'scheme.fg' })}
  }
  &:focus {
    outline: none;
  }
`;

const NegateMargins = styled.div`
  * {
    margin-bottom: 0;
    padding-top: 0;
  }
`;

type CardProps = {
  content?: Array<any>;
  date?: string;
  enableCategory?: boolean;
  excerpt?: object[];
  index?: number; // Used to animate to the right instead of left
  span: number;
  mobileSpan?: number;
  subtitle?: string;
  title?: string;
  url: string;
};

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { url, span, mobileSpan, index, content, title, subtitle, enableCategory, date, excerpt } =
    props;

  const category = React.useMemo(() => {
    if (!url) {
      return '';
    }
    return url.split('/')?.[1];
  }, [url]);

  const accentColor = React.useMemo(() => {
    if (!url) {
      return 'scheme.heavyAccent';
    }

    return categoryColors[category]?.bg || 'scheme.heavyAccent';
  }, [category, url]);

  const smallSpan = mobileSpan || '6';

  const card = (
    <BorderBox
      gridColumn={[`span ${smallSpan}`, null, `span ${span}`]}
      pb={span === 12 ? ['25%'] : ['40%', null, '82%', '60%', '44%']}
      minHeight="12rem"
      position="relative"
      as={url ? 'a' : 'div'}
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
      <HoverBox url={url} p={['200', null, '600']} index={index} span={span}>
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
            <SimplePortableText blocks={content} />
          </NegateMargins>
        )}
        {url && (
          <Box mt="100">
            <ArrowForward />
          </Box>
        )}
      </HoverBox>
    </BorderBox>
  );

  return url ? (
    <Link href={url} passHref>
      {card}
    </Link>
  ) : (
    <>{card}</>
  );
};

export default Card;
