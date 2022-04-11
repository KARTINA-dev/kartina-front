import React from 'react';

import { Header } from '@/components/Header/Header';

import styles from './Market.module.scss';

const Market: React.VFC = () => {
  return (
    <div className={styles.market}>
      <Header />
    </div>
  );
};

export default Market;
