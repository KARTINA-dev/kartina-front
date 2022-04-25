import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ListingCard } from '@/components/ListingCard/ListingCard';
import { TListing } from '@/store/user/types';
import { useTranslation } from '@/i18n';
import { getListings } from '@/api/market';

import styles from './Collections.module.scss';
import { Size } from '@/types/common';

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
  listingID: 4,
  resourceID: 43173733,
  price: '300',
  owner: '0xae902f62c22b8a83',
};

const MOCK_LISTINGS = Array.from({ length: 10 }, () => MOCK_LISTING);

export const Collections: React.VFC = () => {
  const { t } = useTranslation();
  const [firstListings, setFirstListings] = useState<TListing[]>();
  const [secondListings, setSecondListings] = useState<TListing[]>();

  useEffect(() => {
    getListings('0xf18c70daf915e518')
      .then((resp) => {
        setFirstListings(resp);
        console.log(JSON.stringify(resp));
      })
      .catch((err) => console.log(JSON.stringify(err)));

    getListings('0x0b7878633a907c55')
      .then((resp) => {
        setSecondListings(resp);
        console.log(JSON.stringify(resp));
      })
      .catch((err) => console.log(JSON.stringify(err)));
  }, []);

  const collections = [
    {
      id: 1,
      name: 'UI KIT',
      gallery: { name: '345 Gallery', addr: '10x0000000000' },
      listings: secondListings,
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
