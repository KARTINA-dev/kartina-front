import React from 'react';

import { Header } from '@/components/Header/Header';
import { Routes } from '@/constants/routes';

import styles from './Market.module.scss';

const Market: React.VFC = () => {
  return (
    <div className={styles.market}>
      <Header pathname={Routes.Market} />
    </div>
  );
};

export default Market;
