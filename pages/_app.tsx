import { ThemeProvider } from '@sparkpost/matchbox';
import '../styles/globalStyles.css';

function MatchboxApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MatchboxApp;
