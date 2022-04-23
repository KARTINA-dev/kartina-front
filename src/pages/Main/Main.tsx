import cn from 'classnames';
import React from 'react';
import * as fcl from '@onflow/fcl';

import { ReactComponent as Logo } from '@/assets/logo.svg';
import { useTranslation } from '@/i18n';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { Header } from '@/components/Header/Header';
import { Collections } from '@/components/Collections/Collections';
import { SETUP_ACCOUNT } from '@/cadence/transactions/account/setup_account';
import Routes from '@/constants/routes';

import { useAuthentication } from './hooks';
import styles from './Main.module.scss';

const Main: React.VFC = () => {
  const { t } = useTranslation();

  const { isAuthenticated, login, isLoading } = useAuthentication();

  const setup = async () => {
    const response = await fcl.mutate({
      cadence: SETUP_ACCOUNT,
      limit: 9999,
    });

    await fcl.tx(response).onceSealed();
  };

  if (isLoading) {
    return (
      <div className={cn(styles.main, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Header isAuthenticated={isAuthenticated} login={login} pathname={Routes.Main}>
        <span className={styles.subtitle}>
          {t((d) => d.header.subtitle)}
          <span className={styles.subtitleMeta}>{t((d) => d.header.meta)}</span>
        </span>
      </Header>
      <section className={styles.introduction}>
        <Logo />
      </section>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button style={{ background: '#133AFF', width: 140, height: 80, borderRadius: 10 }} onClick={setup}>
        Setup Account
      </button>
      <Collections />
    </div>
  );
};

export default Main;
