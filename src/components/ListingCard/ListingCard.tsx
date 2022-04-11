import React from 'react';

import { TListing } from '@/store/user/types';
import { useTranslation } from '@/i18n';
import { getIPFSImage } from '@/helpers/getIPFSImage';

import styles from './ListingCard.module.scss';

type IListingCard = TListing;

export const ListingCard: React.FC<IListingCard> = (props) => {
  const { name, description, owner, price, imageCID } = props;
  const { t } = useTranslation();

  console.log(price);

  return (
    <div className={styles.listing}>
      {/*<img src={getIPFSImage({ imageCID })} alt={`Listing ID Image`} className={styles.image} />*/}
      <img src={'https://storage.viv3.com/0x2bbcf99d0d0b346b/m/9'} alt={`Listing ID Image`} className={styles.image} />
      <div className={styles.artist}>
        {/*<img src={//} className={styles.artistImg} alt="ListingCard Artist Avatar"/>*/}
        <span className={styles.artistName}>{owner}</span>
      </div>
      <div className={styles.content}>
        <span className={styles.name}>{name}</span>
        <span className={styles.description}>{description}</span>
        <span className={styles.price}>{t((d) => d.flow.amount, { amount: price })}</span>
      </div>
    </div>
  );
};
