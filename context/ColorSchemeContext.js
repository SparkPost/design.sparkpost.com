import React from 'react';
import { usePrefersColorScheme } from '@sparkpost/matchbox';

export const ColorSchemeContext = React.createContext({ colorScheme: 'light', toggle: () => {} });

export function ColorSchemeProvider({ children }) {
  const prefers = usePrefersColorScheme();
  // const [scheme, setScheme] = React.useState(prefers);
  // Default to light for now
  const [scheme, setScheme] = React.useState('light');

  function handleToggle() {
    setScheme(scheme === 'light' ? 'dark' : 'light');
  }

  return (
    <ColorSchemeContext.Provider value={{ colorScheme: scheme, toggle: handleToggle }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}
