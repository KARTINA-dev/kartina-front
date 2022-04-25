import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ListingCard } from '@/components/ListingCard/ListingCard';
import { TListing } from '@/store/user/types';
import { useTranslation } from '@/i18n';
import { getListings } from '@/api/market';

import styles from './Collections.module.scss';

export const Collections: React.VFC = () => {
  const { t } = useTranslation();
  const [mockListings, setMockListings] = useState<TListing[]>();

  useEffect(() => {
    getListings('0x0b7878633a907c55')
      .then((resp) => {
        setMockListings(resp);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  }, []);

  const collections = [
    {
      id: 1,
      name: 'UI KIT',
      gallery: { name: '345 Gallery', addr: '10x0000000000' },
      listings: mockListings,
    },
  ];

  return (
    <div className={styles.collections}>
      <h1 className={styles.title}>{t((d) => d.collections.title)}</h1>
      {collections.length &&
        collections.map(({ id, name, gallery, listings }) => (
          <div key={id} className={styles.collection}>
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
