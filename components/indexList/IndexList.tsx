import React from 'react';
import { Box } from '@sparkpost/matchbox';
import { Card } from '../card';

type IndexListProps = {
  layout?: 'oneColumn' | 'multiColumn';
  enableDatesAndExcerpts: boolean;
  items?: {
    title: string;
    slug: string;
    subtitle?: string;
    created_at?: string;
    excerpt?: object[];
  }[];
};

function IndexList(props: IndexListProps): JSX.Element {
  function renderOneColumn() {
    return props.items.map((item, i) => (
      <Box key={i} mt="-2px" ml="-1px" mr="-1px">
        <Card
          title={item.title}
          url={item.slug}
          subtitle={item.subtitle}
          span={12}
          date={props.enableDatesAndExcerpts ? item.created_at : null}
          excerpt={props.enableDatesAndExcerpts ? item.excerpt : null}
        />
      </Box>
    ));
  }

  function renderMultiColumn() {
    return (
      <Box
        display="grid"
        gridTemplateColumns={`repeat(12, 1fr)`}
        m="0 auto"
        mt="-1px"
        ml="-1px"
        mr="-1px"
      >
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
      <Box maxWidth={props.layout === 'oneColumn' ? '1300' : ''} m="0 auto" mb="-1px">
        <div>{props.layout === 'oneColumn' ? renderOneColumn() : renderMultiColumn()}</div>
      </Box>
    </Box>
  );
}

export default IndexList;
