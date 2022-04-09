import cn from 'classnames';
import React from 'react';
import * as fcl from '@onflow/fcl';
import * as ft from '@onflow/types';

import { ReactComponent as Logo } from '@/assets/logo.svg';
import { useTranslation } from '@/i18n';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { Header } from '@/components/Header/Header';
import { TRANSACTION_MARKET_PURCHASE } from '@/cadence/transactions/market/purchase';

import { useAuthentication } from './hooks';
import styles from './Main.module.scss';

const Main: React.VFC = () => {
  const { t } = useTranslation();

  const { user, login, isLoading } = useAuthentication();

  const purchase = async () => {
    if (!user) {
      return;
    }

    const listingId = 1;

    const response = await fcl.mutate({
      cadence: TRANSACTION_MARKET_PURCHASE,
      args: [fcl.arg(Number(listingId), ft.UInt64), fcl.arg(user.addr, ft.Address)],
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
      <Header isAuthenticated={Boolean(user)} login={login}>
        <span className={styles.subtitle}>
          {t((d) => d.header.subtitle)}
          <span className={styles.subtitleMeta}>{t((d) => d.header.meta)}</span>
        </span>
      </Header>
      <section className={styles.introduction}>
        <Logo onClick={purchase} />
      </section>
    </div>
  );
};

export default Main;
