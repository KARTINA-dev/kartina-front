import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { TListing } from '@/store/user/types';
import { useTranslation } from '@/i18n';
import { Routes } from '@/constants/routes';
import { getIPFSImage } from '@/helpers/getIPFSImage';
import { Size } from '@/types/common';

import styles from './ListingCard.module.scss';

interface IListingCard extends TListing {
  size?: Size;
}

export const ListingCard: React.FC<IListingCard> = (props) => {
  const { name, owner, price, imagePath, imageCID, artist, listingID, size = Size.XS } = props;
  const { t } = useTranslation();

  return (
    <Link to={`${Routes.Listing}/${owner}/${listingID}`} className={cn(styles.listing, styles[`listingSize${size}`])}>
      <img src={getIPFSImage({ imageCID, imagePath })} alt={`Listing ID Image`} className={styles.image} />
      <div className={styles.content}>
        <span className={styles.name}>{name}</span>
        <span className={styles.artistName}>{artist}</span>
        <span className={styles.price}>{t((d) => d.flow.amount, { amount: parseFloat(price).toFixed(3) })}</span>
      </div>
    </Link>
  );
};
