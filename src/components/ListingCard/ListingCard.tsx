import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useTranslation } from '@/i18n';
import { Routes } from '@/constants/routes';
import { getIPFSImage } from '@/helpers/getIPFSImage';
import { ReactComponent as FlowIcon } from '@/assets/icons/flow_12.svg';
import { TListing } from '@/store/market/types';
import { Size } from '@/types/common';

import styles from './ListingCard.module.scss';

export interface IListingCard extends TListing {
  size?: Size.S | Size.M | Size.L;
}

export const ListingCard: React.FC<IListingCard> = (props) => {
  const { name, owner, price, imagePath, imageCID, artist, listingID, size = Size.S } = props;
  const { t } = useTranslation();

  return (
    <Link to={`${Routes.Listing}/${owner}/${listingID}`} className={cn(styles.listing, styles[`listingSize${size}`])}>
      <img src={getIPFSImage({ imageCID, imagePath })} alt={`Listing ID Image`} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          <span className={styles.artist}>{artist}</span>
        </div>
        <div className={styles.price}>
          <FlowIcon />
          <span className={styles.amount}>{t((d) => d.flow.amount, { amount: parseFloat(price).toFixed(3) })}</span>
        </div>
      </div>
    </Link>
  );
};
