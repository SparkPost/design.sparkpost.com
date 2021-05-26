import React from 'react';
import { usePrefersColorScheme } from '@sparkpost/matchbox';

export const ColorSchemeContext = React.createContext({ colorScheme: 'light', toggle: () => {} });

export function ColorSchemeProvider({ children }) {
  const prefers = usePrefersColorScheme();
  const [scheme, setScheme] = React.useState('light');

  function handleToggle() {
    setScheme(scheme === 'light' ? 'dark' : 'light');
  }

  React.useEffect(() => {
    setScheme(prefers);
  }, []);

  return (
    <ColorSchemeContext.Provider value={{ colorScheme: scheme, toggle: handleToggle }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}
