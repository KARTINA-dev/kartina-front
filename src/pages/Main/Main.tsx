import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as ThemeIcon } from '../../assets/icons/theme_24.svg';
import { useTranslation } from '../../i18n';
import cn from 'classnames';

import styles from './Main.module.scss';

export const Main: React.VFC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.main}>
      <section className={styles.introduction}>
        <div className={styles.header}>
          <ul className={styles.headerColumn}>
            <li className={styles.headerItem}>
              <a className={styles.headerLink}>{t(({ introduction }) => introduction.header.drops)}</a>
            </li>
            <li className={styles.headerItem}>
              <a className={styles.headerLink}>{t(({ introduction }) => introduction.header.marketplace)}</a>
            </li>
            <li className={styles.headerItem}>
              <a className={styles.headerLink}>{t(({ introduction }) => introduction.header.contact)}</a>
            </li>
          </ul>
          <ul className={styles.headerColumn}>
            <li className={styles.headerItem}>
              <a className={styles.headerLink}>{t(({ introduction }) => introduction.header.faq)}</a>
            </li>

            <li className={styles.headerItem}>
              <a className={cn(styles.headerLink, styles.headerLinkAccent)}>
                {t(({ introduction }) => introduction.header.galleries)}
              </a>
            </li>

            <li className={styles.headerItem}>
              <a className={styles.headerLink}>{t(({ introduction }) => introduction.header.socials)}</a>
            </li>
          </ul>
          <ul className={styles.headerColumn}>
            <span className={styles.headerSubtitle}>
              {t(({ introduction }) => introduction.header.subtitle)}
              <span className={styles.headerSubtitleMeta}>{t(({ introduction }) => introduction.header.meta)}</span>
            </span>
          </ul>
          <ul className={cn(styles.headerColumn, styles.headerColumnTools)}>
            <ThemeIcon />
            <div className={styles.headerLanguages}>
              <span className={styles.headerLanguage}>{t(({ introduction }) => introduction.header.ru)}</span>
              <span className={styles.headerLanguage}>{t(({ introduction }) => introduction.header.jp)}</span>
              <span className={styles.headerLanguage}>{t(({ introduction }) => introduction.header.en)}</span>
            </div>
            <a className={cn(styles.headerLink, styles.headerBuy)}>{t(({ introduction }) => introduction.header.ru)}</a>
          </ul>
        </div>
        <Logo />
      </section>
    </div>
  );
};
