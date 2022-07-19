import React from 'react';

import { useTranslation } from '@/i18n';
import { Size } from '@/types/common';
import { useHottest } from '@/components/HottestDrops/hooks';
import { DropCard } from '@/components/DropCard/DropCard';

import styles from './HottestDrops.module.scss';

const cardsSizesOrder = [Size.M, Size.S, Size.L];

export const HottestDrops: React.FC = () => {
  const { t } = useTranslation();
  const { hottest } = useHottest();

  return (
    <div className={styles.hottest}>
      <h1 className={styles.title}>{t((d) => d.hottestDrops.title)}</h1>
      <div className={styles.drops}>
        {hottest?.length
          ? hottest.map((drop, index) => (
              <DropCard key={drop._id} size={cardsSizesOrder[index % cardsSizesOrder.length]} {...drop} />
            ))
          : null}
      </div>
    </div>
  );
};
