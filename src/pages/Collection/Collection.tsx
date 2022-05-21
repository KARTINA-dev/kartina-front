import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Header } from '@/components/Header/Header';
import { Routes } from '@/constants/routes';
import { useTranslation } from '@/i18n';
import { useCollection } from '@/pages/Collection/hooks';
import { ListingCard } from '@/components/ListingCard/ListingCard';
import { useAuthentication } from '@/helpers/useAuthentication';

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

  const floorPrice = useMemo(
    () => Math.min(...(collection?.listings.map((listing) => parseFloat(listing.price)) ?? [0])).toFixed(3),
    [collection],
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
            <table className={styles.details}>
              <tr className={styles.row}>
                <td className={cn(styles.cell, styles.fieldName)}>{t((d) => d.collection.artists)}</td>
                <td className={cn(styles.cell, styles.fieldValue)}>{artists}</td>
              </tr>
              <tr className={styles.row}>
                <td className={cn(styles.cell, styles.fieldName)}>{t((d) => d.collection.floorPrice)}</td>
                <td className={cn(styles.cell, styles.fieldValue)}>{floorPrice} FLOW</td>
              </tr>
              <tr className={styles.row}>
                <td className={cn(styles.cell, styles.fieldName)}>{t((d) => d.collection.assets)}</td>
                <td className={cn(styles.cell, styles.fieldValue)}>{collection.listings.length}</td>
              </tr>
            </table>
            <div className={styles.description}>{collection.description}</div>
          </div>
          <div className={styles.items}>
            {collection.listings.map((item) => (
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
