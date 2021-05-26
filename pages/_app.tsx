import React from 'react';
import { ThemeProvider } from '@sparkpost/matchbox';
import { tokens } from '@sparkpost/design-tokens';
import { createGlobalStyle } from 'styled-components';
import { ColorSchemeProvider, ColorSchemeContext } from '../context/ColorSchemeContext';

const GlobalStyle = createGlobalStyle`	
  body {
    background: ${({ theme }) => theme.colors.scheme.bg};
    color: ${({ theme }) => theme.colors.scheme.fg};
  }
`;

function MatchboxApp({ Component, pageProps }) {
  const { colorScheme } = React.useContext(ColorSchemeContext);

  return (
    <ThemeProvider
      theme={{
        borders: {
          thick: `2px solid ${
            colorScheme === 'dark' ? tokens.color_gray_800 : tokens.color_gray_1000
          }`
        },
        radii: {
          rounded: '9px'
        },
        // Extending colors from matchbox
        colors: {
          scheme: {
            bg: colorScheme === 'light' ? tokens.color_white : tokens.color_gray_1000,
            fg: colorScheme === 'dark' ? tokens.color_white : tokens.color_gray_1000,
            lightFg: colorScheme === 'dark' ? tokens.color_gray_800 : tokens.color_gray_300,
            lightAccent: colorScheme === 'light' ? tokens.color_blue_200 : tokens.color_gray_900,
            heavyAccent: colorScheme === 'light' ? tokens.color_blue_700 : tokens.color_red_400
          },
          gray: {
            100: tokens.color_gray_100,
            200: tokens.color_gray_200,
            300: tokens.color_gray_300,
            400: tokens.color_gray_400,
            500: tokens.color_gray_500,
            600: tokens.color_gray_600,
            700: tokens.color_gray_700,
            800: tokens.color_gray_800,
            900: tokens.color_gray_900,
            1000: tokens.color_gray_1000
          },
          blue: {
            100: tokens.color_blue_100,
            200: tokens.color_blue_200,
            300: tokens.color_blue_300,
            400: tokens.color_blue_400,
            500: tokens.color_blue_500,
            600: tokens.color_blue_600,
            700: tokens.color_blue_700,
            800: tokens.color_blue_800,
            900: tokens.color_blue_900,
            1000: tokens.color_blue_1000
          },
          red: {
            100: tokens.color_red_100,
            200: tokens.color_red_200,
            300: tokens.color_red_300,
            400: tokens.color_red_400,
            500: tokens.color_red_500,
            600: tokens.color_red_600,
            700: tokens.color_red_700,
            800: tokens.color_red_800,
            900: tokens.color_red_900,
            1000: tokens.color_red_1000
          },
          yellow: {
            100: tokens.color_yellow_100,
            200: tokens.color_yellow_200,
            300: tokens.color_yellow_300,
            400: tokens.color_yellow_400,
            500: tokens.color_yellow_500,
            600: tokens.color_yellow_600,
            700: tokens.color_yellow_700,
            800: tokens.color_yellow_800,
            900: tokens.color_yellow_900,
            1000: tokens.color_yellow_1000
          },
          green: {
            100: tokens.color_green_100,
            200: tokens.color_green_200,
            300: tokens.color_green_300,
            400: tokens.color_green_400,
            500: tokens.color_green_500,
            600: tokens.color_green_600,
            700: tokens.color_green_700,
            800: tokens.color_green_800,
            900: tokens.color_green_900,
            1000: tokens.color_green_1000
          },
          teal: {
            100: tokens.color_teal_100,
            200: tokens.color_teal_200,
            300: tokens.color_teal_300,
            400: tokens.color_teal_400,
            500: tokens.color_teal_500,
            600: tokens.color_teal_600,
            700: tokens.color_teal_700,
            800: tokens.color_teal_800,
            900: tokens.color_teal_900,
            1000: tokens.color_teal_1000
          },
          purple: {
            100: tokens.color_purple_100,
            200: tokens.color_purple_200,
            300: tokens.color_purple_300,
            400: tokens.color_purple_400,
            500: tokens.color_purple_500,
            600: tokens.color_purple_600,
            700: tokens.color_purple_700,
            800: tokens.color_purple_800,
            900: tokens.color_purple_900,
            1000: tokens.color_purple_1000
          },
          magenta: {
            100: tokens.color_magenta_100,
            200: tokens.color_magenta_200,
            300: tokens.color_magenta_300,
            400: tokens.color_magenta_400,
            500: tokens.color_magenta_500,
            600: tokens.color_magenta_600,
            700: tokens.color_magenta_700,
            800: tokens.color_magenta_800,
            900: tokens.color_magenta_900,
            1000: tokens.color_magenta_1000
          },
          brand: {
            orange: tokens.color_brand_orange,
            gray: tokens.color_brand_gray,
            blue: tokens.color_brand_blue
          },
          white: tokens.color_white
        }
      }}
    >
      <GlobalStyle colorScheme={colorScheme} />
      <Component {...pageProps} />
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
