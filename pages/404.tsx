import { Box } from '@sparkpost/matchbox';
import Link from 'next/link';

function ErrorPage() {
  return (
    <Box display="flex" height="100vh" alignItems="center" justifyContent="center">
      <Box textAlign="center">
        <Box fontSize="700" lineHeight="700">
          <div>404</div>
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

export default ErrorPage;
