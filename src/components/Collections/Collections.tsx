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
  artist: 'G. Alfredo',
  imageCID: 'bafybeigvrdocvj633ymvtvr2ayy62agwp5k6fq3uu2ua4jg734xnjjtwbu',
  imagePath: 'mbdtf.jpeg',
  itemID: 4,
  resourceID: 43173733,
  price: 300,
  owner: '0xae902f62c22b8a83',
};

const MOCK_LISTINGS = Array.from({ length: 10 }, () => MOCK_LISTING);

const MOCK_COLLECTIONS: TCollection[] = [
  {
    id: 0,
    name: 'Megastructures of The Territory',
    gallery: { name: 'Fontdana', addr: '0xae902f62c22b8a83' },
    listings: MOCK_LISTINGS,
  },
  {
    id: 0,
    name: 'Vibes',
    gallery: { name: 'Tanguy Jestin', addr: '0xae902f62c22b8a83' },
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
