import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import * as fcl from '@onflow/fcl';
import * as ft from '@onflow/types';

import { useTranslation } from '@/i18n';
import { Header } from '@/components/Header/Header';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { getIPFSImage } from '@/helpers/getIPFSImage';
import { Routes } from '@/constants/routes';
import { MARKET_PURCHASE_LISTING } from '@/cadence/market/purchase_listing';
import { MARKET_REMOVE_LISTING } from '@/cadence/market/remove_listing';

import { useListingInfo } from './hooks';
import styles from './Listing.module.scss';

const Listing: React.VFC = () => {
  const { t } = useTranslation();
  const { address, listingID } = useParams();
  const { listing, isLoading } = useListingInfo(address, Number(listingID));
  const navigate = useNavigate();

  if (isLoading || !listing) {
    return (
      <div className={cn(styles.listingpage, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  const buyListing = async (listingID: number, ownerAccount: string) => {
    const response = await fcl.mutate({
      cadence: MARKET_PURCHASE_LISTING,
      args: () => [fcl.arg(listingID, ft.UInt64), fcl.arg(ownerAccount, ft.Address)],
      limit: 9999,
    });

    await fcl.tx(response).onceSealed();
  };

  const removeListing = async (listingID: number) => {
    const response = await fcl.mutate({
      cadence: MARKET_REMOVE_LISTING,
      args: () => [fcl.arg(listingID, ft.UInt64)],
    });

    await fcl.tx(response).onceSealed();

    navigate(Routes.Profile);
  };

  const { imageCID, imagePath, owner, description, name, price, artist } = listing;

  return (
    <div className={styles.listingpage}>
      <Header />
      <div className={styles.listing}>
        <img src={getIPFSImage({ imageCID, imagePath })} alt={`Listing ID Image`} className={styles.image} />
        <div className={styles.content}>
          <div className={styles.links}>
            <span className={styles.artistName}>
              <b>Artist</b> {artist}
            </span>
            <span className={styles.ownerName}>
              <b>Owner</b> {owner}
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.name}>{name}</span>
            <span className={styles.description}>{description}</span>
            <span className={styles.price}>{t((d) => d.flow.amount, { amount: price })}</span>
          </div>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button className={styles.buy} onClick={() => buyListing(Number(listingID), owner)}>
            {t((d) => d.listing.buy)}
          </button>
          <button className={styles.delete} onClick={() => removeListing(Number(listingID))}>
            {t((d) => d.listing.remove)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listing;
