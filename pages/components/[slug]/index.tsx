import React from 'react';
import { useRouter } from 'next/router';

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

  return 'Loading';
}

export default ComponentIndex;
