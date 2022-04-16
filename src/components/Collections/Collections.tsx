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
  thumbnail:
    'https://bafybeicyacwo7tlgyoye4hfktb4zpbsajrkhowllcl4sqfwvbqbya3aere.ipfs.dweb.link/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202022-04-14%20%D0%B2%2001.05.34.png',
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
