import React from 'react';
import { useRouter } from 'next/router';

function ComponentIndex() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace(`${router.asPath}/api`);
  });

  return 'Loading';
}

export default ComponentIndex;
