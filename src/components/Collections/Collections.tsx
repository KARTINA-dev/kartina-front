import React from 'react';
import { Link } from 'react-router-dom';

import { ListingCard } from '@/components/ListingCard/ListingCard';
import { TListing } from '@/store/user/types';
import { useTranslation } from '@/i18n';

import styles from './Collections.module.scss';

type TCollection = {
  id: number;
  name: string;
  gallery: { name: string; addr: string };
  listings: TListing[];
};

const MOCK_LISTING: TListing = {
  name: 'Green Tuk-Tuk',
  description: 'A green tuk-tuk with serial number 4',
  imageCID: 'bafybeiaeixpd4htnngycs7ebktdt6crztvhyiu2js4nwvuot35gzvszchi',
  itemID: 4,
  resourceID: 43173733,
  kind: {
    rawValue: 3,
  },
  rarity: {
    rawValue: 1,
  },
  price: 300,
  owner: '0xae902f62c22b8a83',
};

const MOCK_LISTINGS = Array.from({ length: 10 }, () => MOCK_LISTING);

const MOCK_COLLECTIONS: TCollection[] = [
  {
    id: 0,
    name: 'Megastructures of The Territory',
    gallery: { name: 'Fontdana', addr: '0x94b06cfca1d8a476' },
    listings: MOCK_LISTINGS,
  },
  {
    id: 0,
    name: 'Vibes',
    gallery: { name: 'Tanguy Jestin', addr: '0x94b06cfca1d8a476' },
    listings: MOCK_LISTINGS,
  },
];

export const Collections: React.VFC = () => {
  const collections = MOCK_COLLECTIONS;

  const { t } = useTranslation();

  return (
    <div className={styles.collections}>
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
              {listings.length ? listings.map((listing) => <ListingCard key={listing.itemID} {...listing} />) : null}
            </div>
          </div>
        ))}
    </div>
  );
};
