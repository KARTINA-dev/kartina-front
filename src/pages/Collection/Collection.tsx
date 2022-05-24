import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Header } from '@/components/Header/Header';
import { Routes } from '@/constants/routes';
import { useTranslation } from '@/i18n';
import { useCollection } from '@/pages/Collection/hooks';
import { ListingCard } from '@/components/ListingCard/ListingCard';
import { useAuthentication } from '@/helpers/useAuthentication';
import { Size } from '@/types/common';
import { ReactComponent as FlowIcon } from '@/assets/icons/flow_12.svg';

import styles from './Collection.module.scss';

const Collection: React.FC = () => {
  const { collectionID } = useParams();
  const { t } = useTranslation();
  const { collection } = useCollection(collectionID);
  const { login, isAuthenticated } = useAuthentication();

  const artists = useMemo(() => {
    const uniqueArtists = Array.from(new Set(collection?.listings.map((listing) => listing.artist)));

    return uniqueArtists.map((artist, index) => (index + 1 === uniqueArtists.length ? artist : `${artist}, `));
  }, [collection?.listings]);

  const lowestPrice = useMemo(
    () => Math.min(...(collection?.listings.map((listing) => parseFloat(listing.price)) ?? [0])).toFixed(3),
    [collection?.listings],
  );

  return (
    <div className={styles.collection}>
      <Header pathname={Routes.Collections} login={login} isAuthenticated={isAuthenticated} />
      {collection ? (
        <div className={styles.content}>
          <h1 className={styles.name}>
            {collection.name}
            <Link className={styles.gallery} to={'#'}>
              {t((d) => d.collections.galleryPrefix, { gallery: collection.gallery.name })}
            </Link>
          </h1>
          <div className={styles.info}>
            <ListingCard key={collection.listings[0].listingID} size={Size.L} {...collection.listings[0]} />
            <div className={styles.description}>{collection.description}</div>
            <div className={styles.details}>
              <span className={styles.fieldName}>{t((d) => d.collection.artists)}</span>
              <span>{artists}</span>
              <span className={styles.fieldName}>{t((d) => d.collection.floorPrice)}</span>
              <div className={styles.price}>
                <FlowIcon />
                <span className={styles.amount}>{t((d) => d.flow.amount, { amount: lowestPrice })}</span>
              </div>
              <span className={styles.fieldName}>{t((d) => d.collection.assets)}</span>
              <span>{collection.listings.length}</span>
            </div>
          </div>
          <div className={styles.items}>
            {collection.listings.slice(1).map((item) => (
              <ListingCard key={item.listingID} {...item} />
            ))}
          </div>
        </div>
      ) : (
        <h1 className={styles.notFount}>{t((d) => d.collection.notFound)}</h1>
      )}
    </div>
  );
};

export default Collection;
