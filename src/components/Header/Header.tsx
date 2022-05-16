import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import React, { useMemo, useState } from 'react';
import { Turn as Hamburger } from 'hamburger-react';

import { ReactComponent as ThemeIcon } from '@/assets/icons/theme_24.svg';
import { Routes } from '@/constants/routes';
import { useTranslation } from '@/i18n';
import { Theme, useThemeContext } from '@/helpers/Theme/ThemeProvider';
import { SYSTEM_LANGUAGES } from '@/i18n/resources';
import { ProfileTabs } from '@/pages/Profile/types';

import styles from './Header.module.scss';

interface IHeader {
  login?: () => void;
  logout?: () => void;
  isAuthenticated?: boolean;
  galleryName?: string | null;
  pathname: Routes;
}

export const Header: React.FC<IHeader> = (props) => {
  const { isAuthenticated, login, logout, pathname, galleryName } = props;
  const { theme, toggleTheme } = useThemeContext();
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const HEADER_MENU_ROUTES = useMemo(
    () => [
      { route: Routes.Main, label: t((d) => d.header.links[Routes.Main]) },
      { route: Routes.Market, label: t((d) => d.header.links[Routes.Market]) },
      { route: Routes.Manage, label: t((d) => d.header.links[Routes.Manage]) },
    ],
    [t],
  );

  const languages = useMemo(() => {
    const availableLanguages = SYSTEM_LANGUAGES.filter((lang) => lang !== i18n.language);

    availableLanguages.splice(1, 0, i18n.language);

    return availableLanguages;
  }, [i18n.language]);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
  };

  const toggleTokyo = () => {
    document.body.setAttribute('theme', 'tokyo');
  };

  return (
    <header className={cn(styles.header, { [styles.headerMenuOpen]: menuOpen })}>
      <div className={styles.menu}>
        <div className={styles.burgerContainer}>
          <Hamburger toggled={menuOpen} size={23} distance={'sm'} onToggle={toggleMenu} />
        </div>
        <div className={styles.menuLinks}>
          <ThemeIcon className={styles.menuLinksItem} onClick={toggleTheme} />
          <div className={styles.infoLanguages}>
            {languages.map((lang) => (
              <span
                key={lang}
                className={cn(styles.infoLanguagesItem, {
                  [styles.infoLanguagesItemActive]: i18n.language === lang,
                })}
                onClick={() => changeLanguage(lang)}
              >
                {t((d) => d.header.languages[lang as keyof typeof d.header.languages])}
              </span>
            ))}
          </div>
          {HEADER_MENU_ROUTES.map(({ route, label }) => (
            <NavLink
              key={route}
              to={route}
              className={({ isActive }) => cn(styles.menuLinksItem, { [styles.menuLinksItemActive]: isActive })}
            >
              {label}
            </NavLink>
          ))}
          {theme === Theme.Light && i18n.language === 'jp' && (
            <span className={cn(styles.menuLinksItem)} onClick={toggleTokyo}>
              {t((d) => d.header.tokyo)}
            </span>
          )}
        </div>
      </div>
      <Link className={styles.logo} to={Routes.Main}>
        KARTINA
      </Link>
      <div className={styles.info}>
        {galleryName && <span className={styles.infoLink}>{galleryName}</span>}
        {login || logout ? (
          isAuthenticated ? (
            [Routes.Profile, Routes.Manage].includes(pathname) ? (
              <button className={cn(styles.infoLink, styles.infoBuy)} onClick={logout}>
                {t((d) => d.header.logout)}
              </button>
            ) : (
              <Link className={cn(styles.infoLink, styles.infoBuy)} to={Routes.Profile}  state={{ activeTab: ProfileTabs.Collection }}>
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
  );
};
