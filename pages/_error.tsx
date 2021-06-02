import { Box } from '@sparkpost/matchbox';
import Link from 'next/link';

function ErrorPage({ statusCode }) {
  return (
    <Box display="flex" height="100vh" alignItems="center" justifyContent="center">
      <Box textAlign="center">
        <Box fontSize="700" lineHeight="700">
          <div>{statusCode ? `${statusCode}` : 'An error occurred on client'}</div>
        </Box>
        <Box fontSize="200">
          <Link href="/">
            <a>Go to home page</a>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
