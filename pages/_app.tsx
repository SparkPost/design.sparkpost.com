import { ThemeProvider } from '@sparkpost/matchbox';
import { tokens } from '@sparkpost/design-tokens';

function MatchboxApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      theme={{
        borders: {
          thick: `2px solid ${tokens.color_gray_1000}`
        }
      }}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MatchboxApp;
