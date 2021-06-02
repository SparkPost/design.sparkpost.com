import React from 'react';
import * as Components from '@sparkpost/matchbox';
import * as Icons from '@sparkpost/matchbox-icons';
import { PortableText } from '@lib/sanity';
import CodeBlock from './CodeBlock';
import { LiveProvider, LivePreview, LiveError } from 'react-live';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import styled from 'styled-components';
import { Header } from './Block';

const Box = Components.Box;
const ThemeProvider = Components.ThemeProvider;

const NegateParagraphMargins = styled(Box)`
  p {
    margin-bottom: 0;
  }
`;

type ComponentExampleProps = {
  node: {
    name: string;
    description?: object[];
    code: {
      code: string;
      language: string;
    };
  };
};

// For some reason preview doesnt render on hard refresh of a page
// But navigating away and back fixes it
function ComponentExample(props: ComponentExampleProps): JSX.Element {
  const { name, description, code } = props.node;

  return (
    <Box mb="600">
      <Header level="4">{name}</Header>
      <Box mb="400">
        <NegateParagraphMargins>
          <PortableText blocks={description} />
        </NegateParagraphMargins>
      </Box>
      <Box>
        <LiveProvider code={code.code} scope={{ ...Components, ...Icons }}>
          {/*
            Important
            This is rendered in an iframe so that this sites
            theme and styles do not conflict with previews
          */}
          <Box
            as={Frame}
            display="block"
            border="thick"
            width="100%"
            borderRadius="rounded"
            borderBottomRightRadius="0"
            borderBottomLeftRadius="0"
            mb="-2px"
            height="300px"
            // BG should always be white because matchbox components dont look great in dark mode
            bg="white"
          >
            <FrameContextConsumer>
              {({ document }) => {
                return (
                  <ThemeProvider target={document.head}>
                    <link href="/assets/critical.css" rel="stylesheet" />
                    <Box p="500">
                      <LivePreview />
                    </Box>
                  </ThemeProvider>
                );
              }}
            </FrameContextConsumer>
          </Box>
          <LiveError />
        </LiveProvider>
      </Box>
      <Box mt="-2px">
        <CodeBlock node={code} connectWithTop />
      </Box>
    </Box>
  );
}

export default ComponentExample;
