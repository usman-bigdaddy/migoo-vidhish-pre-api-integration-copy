import { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { createBaseLightTheme, createBaseDarkTheme } from '../theme/DefaultColors';

// Create RTL and LTR caches
const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: 'muiltr',
  stylisPlugins: [prefixer],
});

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const toggleDirection = (rtlEnabled) => setIsRtl(rtlEnabled);

  const theme = useMemo(() => {
    const baseTheme = isDarkMode ? createBaseDarkTheme() : createBaseLightTheme();
    return { ...baseTheme, direction: isRtl ? 'rtl' : 'ltr' };
  }, [isDarkMode, isRtl]);

  const cache = isRtl ? rtlCache : ltrCache;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, isRtl, toggleDirection }}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};
