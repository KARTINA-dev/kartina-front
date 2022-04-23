import React from 'react';
import { Link } from 'react-router-dom';

import { TListing } from '@/store/user/types';
import { useTranslation } from '@/i18n';
import { Routes } from '@/constants/routes';
import { getIPFSImage } from '@/helpers/getIPFSImage';

import styles from './ListingCard.module.scss';

type IListingCard = TListing;

export const ListingCard: React.FC<IListingCard> = (props) => {
  const { itemID, name, description, owner, price, imagePath, imageCID } = props;
  const { t } = useTranslation();

  return (
    <Link to={`${Routes.Item}/${owner}/${itemID}`} className={styles.listing}>
      <img src={getIPFSImage({ imageCID, imagePath })} alt={`Listing ID Image`} className={styles.image} />
      <div className={styles.artist}>
        <span className={styles.artistName}>{owner}</span>
      </div>
      <div className={styles.content}>
        <span className={styles.name}>{name}</span>
        <span className={styles.description}>{description}</span>
        <span className={styles.price}>{t((d) => d.flow.amount, { amount: price })}</span>
      </div>
    </Link>
  );
};
