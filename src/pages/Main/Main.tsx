import React from 'react';
import cn from 'classnames';

import { useTranslation } from '@/i18n';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { Collections } from '@/components/Collections/Collections';
import { HottestDrops } from '@/components/HottestDrops/HottestDrops';
import { useAuthentication } from '@/helpers/useAuthentication';

import { EmailSubscribe } from './components/EmailSubscribe';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  const { t } = useTranslation();
  const { isLoading } = useAuthentication();

  if (isLoading) {
    return (
      <div className={cn(styles.main, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <HottestDrops />
      <Collections />
      <EmailSubscribe title={t((d) => d.subscribeForm.titleAll)} />
    </div>
  );
};

export default Main;
