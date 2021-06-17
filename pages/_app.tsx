import React from 'react';
import { ThemeProvider } from '@sparkpost/matchbox';
import getTheme from '@lib/theme';
import { createGlobalStyle } from 'styled-components';
import { ColorSchemeProvider, ColorSchemeContext } from '../context/ColorSchemeContext';
import { AnimatePresence } from 'framer-motion';

const GlobalStyle = createGlobalStyle`	
  
  body {
    background: ${({ theme }) => theme.colors.scheme.bg};
    color: ${({ theme }) => theme.colors.scheme.fg};
  }
  * {
    touch-action: manipulation;
  }
`;

function MatchboxApp({ Component, pageProps, router }) {
  const { colorScheme } = React.useContext(ColorSchemeContext);

  return (
    <ThemeProvider theme={getTheme(colorScheme)}>
      <GlobalStyle colorScheme={colorScheme} />
      <AnimatePresence exitBeforeEnter>
        <Component key={router.asPath} {...pageProps} />
        <div id="portal-target" />
      </AnimatePresence>
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
