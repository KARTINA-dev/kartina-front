import React, { useState } from 'react';
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
import { useAuthentication } from '@/pages/Main/hooks';
import { ReactComponent as HeartIcon } from '@/assets/icons/heart.svg';
import { ReactComponent as ShareIcon } from '@/assets/icons/share.svg';
import { ReactComponent as OpenIcon } from '@/assets/icons/open.svg';
import { ReactComponent as FlowLogo } from '@/assets/flowLogo.svg';
import { Tabs, TabsPane } from '@/components/Tabs/Tabs';
import { ListingTabs } from '@/pages/Listing/types';

import styles from './Listing.module.scss';
import { useListingInfo } from './hooks';

const Listing: React.VFC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { address, listingID } = useParams();
  const { listing, isLoading } = useListingInfo(address, Number(listingID));
  const [localPrice, setLocalPrice] = useState<string>();
  const DEFAULT_ACTIVE_TAB = ListingTabs.Description;

  const [activeTab, setActiveTab] = useState<ListingTabs>(DEFAULT_ACTIVE_TAB);

  const { isAuthenticated, login, user } = useAuthentication();

  // TODO: Определиться с API для получения курса валют
  // useEffect(() => {
  //   if (listing) {
  //     getLocalAmount('FLOW', 'RUB', listing.price)
  //       .then((a) => setLocalPrice(a))
  //       .catch((err) => err);
  //   }
  // }, [listing]);
  // const getLocalAmount = async (crypto: string, local: string, amount: string) => {
  //   const rate = await api.currency.getRate(crypto, local);
  //
  //   return (rate * parseFloat(amount)).toFixed(3);
  // };

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
      limit: 9999,
    });

    await fcl.tx(response).onceSealed();

    navigate(Routes.Profile);
  };

  if (isLoading || !listing) {
    return (
      <div className={cn(styles.listingpage, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  const { imageCID, imagePath, owner, description, name, price, artist } = listing;

  return (
    <div className={styles.listingpage}>
      <Header isAuthenticated={isAuthenticated} login={login} pathname={Routes.Main} />
      <div className={styles.listing}>
        <img src={getIPFSImage({ imageCID, imagePath })} alt={`Listing ID Image`} className={styles.image} />

        <div className={styles.info}>
          <div className={styles.infoRow}>
            <div className={styles.mainInfo}>
              <span className={styles.mainInfo__name}>{name}</span>
              <span className={styles.mainInfo__artist}>{artist}</span>
            </div>
            <div className={styles.actions}>
              <button>
                <HeartIcon className={styles.action} />
              </button>
              <button>
                <ShareIcon className={styles.action} />
              </button>
              <button>
                <OpenIcon className={styles.action} />
              </button>
            </div>
          </div>

          <div>
            <div className={styles.listing__subtitle}>{t((d) => d.listing.price)}</div>
            <div className={styles.infoRow}>
              <div className={styles.price}>
                <div className={styles.priceCrypto}>
                  <FlowLogo />
                  <span className={styles.priceCrypto__amount}>{parseFloat(price).toFixed(3)} FLOW</span>
                </div>
                {localPrice && <div className={styles.priceLocal}>≈ {localPrice} RUB</div>}
              </div>

              <div className={styles.buttons}>
                {owner === user.addr ? (
                  <button
                    className={cn(styles.button, styles.buttonPrimary)}
                    onClick={() => removeListing(Number(listingID))}
                  >
                    {t((d) => d.listing.remove)}
                  </button>
                ) : (
                  <>
                    <button
                      className={cn(styles.button, styles.buttonPrimary)}
                      onClick={() => buyListing(Number(listingID), owner)}
                    >
                      {t((d) => d.listing.buy)}
                    </button>
                    <button className={cn(styles.button, styles.buttonSecondary)}>{t((d) => d.listing.offer)}</button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.extendedInfo}>
            <Tabs
              className={styles.extendedInfoTabs}
              defaultActiveKey={DEFAULT_ACTIVE_TAB}
              onChange={(key) => setActiveTab(key as ListingTabs)}
              activeKey={activeTab}
            >
              <TabsPane key={ListingTabs.Description} tab={t((d) => d.listing.description)}>
                <p className={styles.description}>{description}</p>
              </TabsPane>
              <TabsPane key={ListingTabs.Details} tab={t((d) => d.listing.details)}>
                <div className={styles.details}>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsRowName}>Creator</span>
                    <span>Didi Gallery</span>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsRowName}>Owner</span>
                    <span>{owner}</span>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsRowName}>Blockchain</span>
                    <span>FLOW</span>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsRowName}>Tocken ID</span>
                    <span>{listingID}</span>
                  </div>
                </div>
              </TabsPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
