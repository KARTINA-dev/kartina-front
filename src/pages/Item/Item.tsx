import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { useTranslation } from '@/i18n';
import { Header } from '@/components/Header/Header';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { getIPFSImage } from '@/helpers/getIPFSImage';
import { useAuthentication } from '@/pages/Main/hooks';
import { Routes } from '@/constants/routes';

import { useItemInfo } from './hooks';
import styles from './Item.module.scss';

const Item: React.VFC = () => {
  const { t } = useTranslation();
  const { address, itemID } = useParams();
  const { item, isLoading } = useItemInfo(address, Number(itemID));
  const { isAuthenticated, login } = useAuthentication();

  if (isLoading || !item) {
    return (
      <div className={cn(styles.itempage, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  const { imageCID, imagePath, owner, description, name, artist } = item;

  return (
    <div className={styles.itempage}>
      <Header isAuthenticated={isAuthenticated} login={login} pathname={Routes.Main} />
      <div className={styles.item}>
        <img src={getIPFSImage({ imageCID, imagePath })} alt={`Listing ID Image`} className={styles.image} />
        <div className={styles.content}>
          <div className={styles.links}>
            <span className={styles.artistName}>
              <b>Artist</b> {artist}
            </span>
            <span className={styles.ownerName}>
              <b>Owner</b> {owner}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.name}>{name}</span>
            <span className={styles.description}>{description}</span>
            <span className={styles.price}>{t((d) => d.flow.amount, { amount: 300 })}</span>
          </div>
          <button className={styles.buy}>{t((d) => d.item.list)}</button>
        </div>
      </div>
    </div>
  );
};

export default Item;
