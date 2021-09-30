import React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@sparkpost/matchbox';

function ComponentIndex() {
  const router = useRouter();

  React.useEffect(() => {
    if (
      !router.asPath.includes('/api') &&
      !router.asPath.includes('/usage') &&
      !router.asPath.includes('/style')
    ) {
      router.replace(`${router.asPath}/api`);
    }
  });

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Box fontSize="200" color="scheme.fg">
        Loading
      </Box>
    </Box>
  );
}

export default ComponentIndex;
