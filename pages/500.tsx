import { Box } from '@sparkpost/matchbox';
import Link from 'next/link';

function ServerError() {
  return (
    <Box display="flex" height="100vh" alignItems="center" justifyContent="center">
      <Box textAlign="center">
        <Box fontSize="800" lineHeight="800">
          500
        </Box>
        <Box fontSize="100" lineHeight="100">
          Server Side Error.{' '}
          <Link href="/">
            <a>Go to home page</a>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default ServerError;
