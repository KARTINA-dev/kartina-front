import React, { useState, useEffect, createContext } from 'react';

export type ITheme = {
  isDarkTheme?: boolean;
  toggleMode?: () => void;
};

export const ThemeContext = createContext<ITheme>({});

export const ThemeProvider: React.FC = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const localTheme = localStorage.getItem('isDarkTheme') === 'true';

    setIsDarkTheme(localTheme);

    const schemeAttribute = document.createAttribute('scheme');

    schemeAttribute.value = localTheme ? 'dark' : 'light';
    document.body.attributes.setNamedItem(schemeAttribute);
  }, []);

  const toggleMode = () => {
    localStorage.setItem('isDarkTheme', `${!isDarkTheme}`);
    setIsDarkTheme(!isDarkTheme);
    document.body.setAttribute('scheme', !isDarkTheme ? 'dark' : 'light');
  };

  return <ThemeContext.Provider value={{ isDarkTheme, toggleMode }}>{children}</ThemeContext.Provider>;
};
