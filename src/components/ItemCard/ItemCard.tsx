import React from 'react';

import { TItem } from '@/store/user/types';
import { useTranslation } from '@/i18n';
import { getIPFSImage } from '@/helpers/getIPFSImage';

import styles from './ItemCard.module.scss';

interface IItemCard extends TItem {
  createListing?: (id: number) => Promise<void>;
}

export const ItemCard: React.FC<IItemCard> = (props) => {
  const { name, imageCID, imagePath, itemID, owner, createListing, resourceID } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.item}>
      <img src={getIPFSImage({ imageCID, imagePath })} alt={`Item ${itemID}`} className={styles.image} />
      <span className={styles.owner}>{owner}</span>
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          <span>{`#${itemID}`}</span>
        </div>
        {createListing && (
          <button className={styles.button} onClick={() => createListing(itemID)}>
            {t((d) => d.item.list)}
          </button>
        )}
      </div>
    </div>
  );
};
