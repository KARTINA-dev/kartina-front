import cn from 'classnames';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';

import { ReactComponent as ThemeIcon } from '@/assets/icons/theme_24.svg';
import { Routes } from '@/constants/routes';
import { useTranslation } from '@/i18n';
import { ThemeContext } from '@/helpers/Theme/ThemeProvider';

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
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      <ul className={styles.headerColumn}>
        <li className={styles.headerItem}>
          <a href='/' className={styles.headerLink}>
            {t((d) => d.header.drops)}
          </a>
        </li>
        <li className={styles.headerItem}>
          <a href='/' className={styles.headerLink}>
            {t((d) => d.header.marketplace)}
          </a>
        </li>
        <li className={styles.headerItem}>
          <a href='/' className={styles.headerLink}>
            {t((d) => d.header.contact)}
          </a>
        </li>
      </ul>
      <ul className={styles.headerColumn}>
        <li className={styles.headerItem}>
          <a href='/' className={styles.headerLink}>
            {t((d) => d.header.faq)}
          </a>
        </li>
        <li className={styles.headerItem}>
          <a href='/' className={cn(styles.headerLink, styles.headerLinkAccent)}>
            {t((d) => d.header.galleries)}
          </a>
        </li>
        <li className={styles.headerItem}>
          <a href='/' className={styles.headerLink}>
            {t((d) => d.header.socials)}
          </a>
        </li>
      </ul>
      <ul className={cn(styles.headerColumn, styles.headerColumnInfo)}>{children}</ul>
      <ul className={cn(styles.headerColumn, styles.headerColumnTools)}>
        <ThemeIcon className={styles.headerTheme} onClick={toggleMode} />
        <div className={styles.headerLanguages}>
          <span className={styles.headerLanguagesItem}>{t((d) => d.header.ru)}</span>
          <span className={styles.headerLanguagesItem}>{t((d) => d.header.jp)}</span>
          <span className={styles.headerLanguagesItem}>{t((d) => d.header.en)}</span>
        </div>
        {login || logout ? (
          isAuthenticated ? (
            pathname === Routes.Profile ? (
              <button className={cn(styles.headerLink, styles.headerBuy)} onClick={logout}>
                {t((d) => d.header.logout)}
              </button>
            ) : (
              <Link className={cn(styles.headerLink, styles.headerBuy)} to={Routes.Profile}>
                {t((d) => d.header.profile)}
              </Link>
            )
          ) : (
            <button className={cn(styles.headerLink, styles.headerBuy)} onClick={login}>
              {t((d) => d.header.login)}
            </button>
          )
        ) : null}
      </ul>
    </div>
  );
};
