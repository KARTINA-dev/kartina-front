import React from 'react';
import { Link } from 'react-router-dom';

import { ListingCard } from '@/components/ListingCard/ListingCard';
import { useTranslation } from '@/i18n';
import { useCollections } from '@/components/Collections/hooks';

import styles from './Collections.module.scss';

export const Collections: React.VFC = () => {
  const { t } = useTranslation();
  const { collections } = useCollections();

  return (
    <div className={styles.collections}>
      <h1 className={styles.title}>{t((d) => d.collections.title)}</h1>
      {collections.length > 0 &&
        collections.map(({ _id, name, gallery, listings }) => (
          <div key={_id} className={styles.collection}>
            <div className={styles.header}>
              <h3 className={styles.name}>
                {name}
                <Link className={styles.gallery} to={'#'}>
                  {t((d) => d.collections.galleryPrefix, { gallery: gallery.name })}
                </Link>
              </h3>
              <span className={styles.button}>{t((d) => d.collections.viewAll)}</span>
            </div>

            <div className={styles.listings}>
              {listings?.length ? listings.map((listing, index) => <ListingCard key={index} {...listing} />) : null}
            </div>
          </div>
        ))}
    </div>
  );
};
