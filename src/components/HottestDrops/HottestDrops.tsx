import React, { useEffect, useState } from 'react';

import { ListingCard } from '@/components/ListingCard/ListingCard';
import { TListing } from '@/store/user/types';
import { useTranslation } from '@/i18n';
import { getListings } from '@/api/market';
import { Size } from '@/types/common';

import styles from './HottestDrops.module.scss';

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
  itemID: 43173733,
};

const cardsSizesOrder = [Size.M, Size.S, Size.L];

export const HottestDrops: React.VFC = () => {
  const { t } = useTranslation();
  const [firstListings, setFirstListings] = useState<TListing[]>();

  useEffect(() => {
    getListings('0xf18c70daf915e518')
      .then((resp) => {
        setFirstListings(resp);
        console.log(JSON.stringify(resp));
      })
      .catch((err) => console.log(JSON.stringify(err)));
  }, []);

  const hottestDaps = [
    {
      id: 0,
      name: 'YE albums covers',
      gallery: { name: 'Yeezy', addr: '0xf18c70daf915e518' },
      listings: firstListings,
    },
  ];

  return (
    <div className={styles.hottest}>
      <h1 className={styles.title}>{t((d) => d.hottestDrops.title)}</h1>
      {hottestDaps.length &&
        hottestDaps.map(({ id, name, gallery, listings }) => (
          <div key={id} className={styles.drop}>
            <div className={styles.listings}>
              {listings?.length
                ? listings.map((listing, index) => (
                    <ListingCard key={index} size={cardsSizesOrder[index % cardsSizesOrder.length]} {...listing} />
                  ))
                : null}
            </div>
          </div>
        ))}
    </div>
  );
};
