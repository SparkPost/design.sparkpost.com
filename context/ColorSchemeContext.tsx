import React from 'react';
// import { usePrefersColorScheme } from '@sparkpost/matchbox';

function noop() {
  return;
}

export const ColorSchemeContext = React.createContext({ colorScheme: 'light', toggle: noop });

export function ColorSchemeProvider(props) {
  const prefers = 'light';
  const [scheme, setScheme] = React.useState('light');

  function handleToggle() {
    setScheme(scheme === 'light' ? 'dark' : 'light');
  }

  React.useEffect(() => {
    setScheme(prefers);
  }, []);

  return (
    <ColorSchemeContext.Provider value={{ colorScheme: scheme, toggle: handleToggle }}>
      {props.children}
    </ColorSchemeContext.Provider>
  );
}
