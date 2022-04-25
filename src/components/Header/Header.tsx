import cn from 'classnames';
import { Link } from 'react-router-dom';
import React, { useContext, useMemo, useState } from 'react';

import { ReactComponent as Logo } from '@/assets/logo.svg';
import { ReactComponent as MenuIcon } from '@/assets/icons/menu_24.svg';
import { ReactComponent as ThemeIcon } from '@/assets/icons/theme_24.svg';
import { Routes } from '@/constants/routes';
import { useTranslation } from '@/i18n';
import { ThemeContext } from '@/helpers/Theme/ThemeProvider';
import { SYSTEM_LANGUAGES } from '@/i18n/resources';
import { Sidebar } from '@/components/Header/Sidebar/Sidebar';

import styles from './Header.module.scss';

interface IHeader {
  login?: () => void;
  logout?: () => void;
  isAuthenticated?: boolean;
  pathname: Routes;
}

export const Header: React.FC<IHeader> = (props) => {
  const { isAuthenticated, login, logout, children, pathname } = props;
  const { toggleMode } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const languages = useMemo(() => {
    const availableLanguages = SYSTEM_LANGUAGES.filter((lang) => lang !== i18n.language);

    availableLanguages.splice(1, 0, i18n.language);

    return availableLanguages;
  }, [i18n.language]);

  const toggleSidebar = () => {
    setSidebarOpen((open) => !open);
  };

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
  };

  return (
    <>
      <header className={styles.header}>
        <button className={styles.menuIcon} onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        <Link className={styles.logo} to={Routes.Main}>
          <Logo />
        </Link>
        <div className={cn(styles.info)}>
          <ThemeIcon className={styles.infoTheme} onClick={toggleMode} />
          <div className={styles.infoLanguages}>
            {languages.map((lang) => (
              <span
                className={cn(styles.infoLanguagesItem, {
                  [styles.infoLanguagesItemActive]: i18n.language === lang,
                })}
                onClick={() => changeLanguage(lang)}
              >
                {t((d) => d.header.languages[lang as keyof typeof d.header.languages])}
              </span>
            ))}
          </div>
          {login || logout ? (
            isAuthenticated ? (
              pathname === Routes.Profile ? (
                <button className={cn(styles.infoLink, styles.infoBuy)} onClick={logout}>
                  {t((d) => d.header.logout)}
                </button>
              ) : (
                <Link className={cn(styles.infoLink, styles.infoBuy)} to={Routes.Profile}>
                  {t((d) => d.header.profile)}
                </Link>
              )
            ) : (
              <button className={cn(styles.infoLink, styles.infoBuy)} onClick={login}>
                {t((d) => d.header.login)}
              </button>
            )
          ) : null}
        </div>
      </header>
      {/*<Sidebar open={sidebarOpen} />*/}
    </>
  );
};
