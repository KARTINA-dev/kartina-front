import React from 'react';
import cn from 'classnames';

import { useTranslation } from '@/i18n';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { Header } from '@/components/Header/Header';
import { Collections } from '@/components/Collections/Collections';
import { Routes } from '@/constants/routes';
import { HottestDrops } from '@/components/HottestDrops/HottestDrops';
import { useAuthentication } from '@/helpers/useAuthentication';

import styles from './Main.module.scss';

const Main: React.VFC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, login, isLoading } = useAuthentication();

  if (isLoading) {
    return (
      <div className={cn(styles.main, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Header isAuthenticated={isAuthenticated} login={login} pathname={Routes.Main} />
      <HottestDrops />
      <Collections />
      <div className={styles.subscribe}>
        <h2 className={styles.subscribeTitle}>{t((d) => d.main.subscribeForm.title)}</h2>
        <div className={styles.subscribeForm}>
          <input className={styles.subscribeInput} type={'email'} placeholder={t((d) => d.main.subscribeForm.email)} />
          <button className={styles.subscribeButton}>{t((d) => d.main.subscribeForm.subscribe)}</button>
        </div>
      </div>
      <footer className={styles.footer}>
        <span className={styles.footerCompany}>{t((d) => d.footer.company)}</span>
        <span className={styles.footerCopyright}>{t((d) => d.footer.copyright)}</span>
      </footer>
    </div>
  );
};

export default Main;
