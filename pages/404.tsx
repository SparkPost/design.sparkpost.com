import { Box } from '@sparkpost/matchbox';
import { PageTransition } from '@components/pageTransition';
import Link from 'next/link';

function ErrorPage() {
  return (
    <PageTransition>
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
    </PageTransition>
  );
}

export default ErrorPage;
