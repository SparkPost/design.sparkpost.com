import React from 'react';
import { Box } from '@sparkpost/matchbox';
import { Card } from '../card';

type IndexListProps = {
  layout?: 'oneColumn' | 'multiColumn';
  items?: {
    title: string;
    slug: string;
    subtitle?: string;
  }[];
};

function IndexList(props: IndexListProps): JSX.Element {
  function renderOneColumn() {
    return props.items.map((item, i) => (
      <Box key={i}>
        <Card title={item.title} url={item.slug} subtitle={item.subtitle} span={12} />
      </Box>
    ));
  }

  function renderMultiColumn() {
    return (
      <Box display="grid" gridTemplateColumns={`repeat(12, 1fr)`} m="0 auto">
        {props.items.map((item, i) => (
          <Card
            title={item.title}
            url={item.slug}
            subtitle={item.subtitle}
            span={3}
            key={i}
            index={i}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box border="thick">
      <Box maxWidth={props.layout === 'oneColumn' ? '1300' : ''} m="0 auto">
        <div>{props.layout === 'oneColumn' ? renderOneColumn() : renderMultiColumn()}</div>
      </Box>
    </Box>
  );
}

export default IndexList;
