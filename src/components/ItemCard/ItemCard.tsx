import React, { ChangeEvent, useState } from 'react';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';

import { Routes } from '@/constants/routes';
import { TItem } from '@/store/user/types';
import { useTranslation } from '@/i18n';
import { getIPFSImage } from '@/helpers/getIPFSImage';

import styles from './ItemCard.module.scss';

export const ItemCard: React.FC<TItem> = (props) => {
  const { name, imageCID, imagePath, itemID, owner, artist } = props;
  const { t } = useTranslation();
  const [listModalVisible, setListModalVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [newListingPrice, setNewListingPrice] = useState<string>('0.0');

  return (
    <Link to={`${Routes.Item}/${owner}/${itemID}`} className={styles.item}>
      <img src={getIPFSImage({ imageCID, imagePath })} alt={`Item ${itemID}`} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          <span className={styles.artist}>{artist}</span>
        </div>
      </div>
    </Link>
  );
};
