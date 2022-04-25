import cn from 'classnames';
import { Link } from 'react-router-dom';
import React, { useMemo, useRef, useState } from 'react';

import { ReactComponent as Logo } from '@/assets/logo.svg';
import { ReactComponent as MenuIcon } from '@/assets/icons/menu_24.svg';
import { ReactComponent as ThemeIcon } from '@/assets/icons/theme_24.svg';
import { Routes } from '@/constants/routes';
import { useTranslation } from '@/i18n';
import { Theme, useThemeContext } from '@/helpers/Theme/ThemeProvider';
import { SYSTEM_LANGUAGES } from '@/i18n/resources';

import styles from './Header.module.scss';

interface IHeader {
  login?: () => void;
  logout?: () => void;
  isAuthenticated?: boolean;
  pathname: Routes;
}

const TOKYO_AUDIO_SRC = 'https://dl1.mp3party.net/download/8422014';

export const Header: React.FC<IHeader> = (props) => {
  const { isAuthenticated, login, logout, pathname } = props;
  const { theme, toggleTheme } = useThemeContext();
  const { t, i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const audioEl = useRef(new Audio(TOKYO_AUDIO_SRC));

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

  const toggleAudio = async () => {
    audioEl.current.volume = 0.0345;
    setIsPlaying((isPlaying) => !isPlaying);
    audioEl.current.paused ? await audioEl.current.play() : audioEl.current.pause();
    document.body.setAttribute('theme', 'tokyo');
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
          {theme === Theme.Light && i18n.language === 'jp' && (
            <span className={cn(styles.infoTokyo, { [styles.infoTokyoActive]: isPlaying })} onClick={toggleAudio}>
              {t((d) => d.header.tokyo)}
            </span>
          )}
          <ThemeIcon className={styles.infoTheme} onClick={toggleTheme} />
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
