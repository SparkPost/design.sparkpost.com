import React, { useEffect } from 'react';
import { ThemeProvider } from '@sparkpost/matchbox';
import getTheme from '@lib/theme';
import styled, { createGlobalStyle } from 'styled-components';
import { ColorSchemeProvider, ColorSchemeContext } from '../context/ColorSchemeContext';
import { AnimatePresence } from 'framer-motion';
import { pageView } from '@lib/ga';

const GlobalStyle = createGlobalStyle`
  * {
    touch-action: manipulation;
  }
`;

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme?.colors?.scheme.bg};
  color: ${({ theme }) => theme?.colors?.scheme.fg};
`;

function MatchboxApp({ Component, pageProps, router }) {
  const { colorScheme } = React.useContext(ColorSchemeContext);

  useEffect(() => {
    const onRouteChange = (url) => {
      pageView(url);
    };

    router.events.on('routeChangeComplete', onRouteChange);

    return () => {
      router.events.off('routeChangeComplete', onRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={getTheme(colorScheme)}>
      <GlobalStyle />
      <StyledWrapper>
        <AnimatePresence exitBeforeEnter>
          <Component key={router.asPath} {...pageProps} />
          <div id="portal-target" />
        </AnimatePresence>
      </StyledWrapper>
    </ThemeProvider>
  );
}

function App(props) {
  return (
    <ColorSchemeProvider>
      <MatchboxApp {...props} />
    </ColorSchemeProvider>
  );
}

export default App;
