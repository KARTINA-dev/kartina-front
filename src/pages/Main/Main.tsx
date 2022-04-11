import cn from 'classnames';
import React from 'react';

import { ReactComponent as Logo } from '@/assets/logo.svg';
import { useTranslation } from '@/i18n';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { Header } from '@/components/Header/Header';
import { Collections } from '@/components/Collections/Collections';

import { useAuthentication } from './hooks';
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
      <Header isAuthenticated={isAuthenticated} login={login}>
        <span className={styles.subtitle}>
          {t((d) => d.header.subtitle)}
          <span className={styles.subtitleMeta}>{t((d) => d.header.meta)}</span>
        </span>
      </Header>
      <section className={styles.introduction}>
        <Logo />
      </section>
      <Collections />
    </div>
  );
};

export default Main;
