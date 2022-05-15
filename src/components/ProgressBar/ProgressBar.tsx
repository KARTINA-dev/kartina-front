import React from 'react';

import { TransactionStatus } from '@/pages/PurchaseConfirmation/types';

import styles from './ProgressBar.module.scss';

interface IProgressBarProps {
  status: TransactionStatus;
}

const ProgressBar: React.FC<IProgressBarProps> = ({ status }) => {
  const getTxProgress = (status: TransactionStatus): string => {
    switch (status) {
      case TransactionStatus.Unknown:
        return '0%';
      case TransactionStatus.Pending:
        return '20%';
      case TransactionStatus.Executed:
        return '60%';
      case TransactionStatus.Sealed:
        return '100%';
      default:
        return '100%';
    }
  };

  return (
    <div className={styles.progressBar}>
      <div style={{ width: getTxProgress(status) }} className={styles.progressBarIndicator} />
    </div>
  );
};

export default ProgressBar;
