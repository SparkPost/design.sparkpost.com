import { ThemeProvider } from '@sparkpost/matchbox';

function MatchboxApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MatchboxApp;
