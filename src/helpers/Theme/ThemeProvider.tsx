import React, { useState, useEffect, createContext, useContext, useCallback, ReactNode } from 'react';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export type ITheme = {
  theme?: Theme;
  toggleTheme?: () => void;
};

const DEFAULT_THEME = Theme.Light;

export const ThemeContext = createContext<ITheme>({});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(Theme.Dark);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') || DEFAULT_THEME;

    setTheme(localTheme as Theme);

    const schemeAttribute = document.createAttribute('theme');

    schemeAttribute.value = localTheme;
    document.body.attributes.setNamedItem(schemeAttribute);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((theme) => {
      const updatedTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;

      document.body.setAttribute('theme', updatedTheme);

      localStorage.setItem('theme', updatedTheme);

      return updatedTheme;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => React.useContext(ThemeContext);
