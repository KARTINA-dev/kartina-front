import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import cn from 'classnames';
import * as fcl from '@onflow/fcl';
import * as ft from '@onflow/types';

import { useTranslation } from '@/i18n';
import { Header } from '@/components/Header/Header';
import { Spinner } from '@/components/Spinner/Spinner';
import { ListingCard } from '@/components/ListingCard/ListingCard';
import { Size } from '@/types/common';
import { getIPFSImage } from '@/helpers/getIPFSImage';
import { Routes } from '@/constants/routes';
import { MARKET_REMOVE_LISTING } from '@/cadence/market/remove_listing';
import { useAuthentication } from '@/helpers/useAuthentication';
import { ReactComponent as FlowIcon } from '@/assets/icons/flow_12.svg';
import { Tabs, TabsPane } from '@/components/Tabs/Tabs';
import { ListingTabs } from '@/pages/Listing/types';
import { ProfileTabs } from '@/pages/Profile/types';

import styles from './Listing.module.scss';
import { useListingInfo, useRelatedListings } from './hooks';

const Listing: React.VFC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { address, listingID: listingIdParam } = useParams();
  const listingId = Number(listingIdParam);
  const { listing, isLoading } = useListingInfo(address, listingId);
  const { related } = useRelatedListings(listingId);
  const [isProceeding, setIsProceeding] = useState<boolean>(false);
  const DEFAULT_ACTIVE_TAB = ListingTabs.Description;

  const [activeTab, setActiveTab] = useState<ListingTabs>(DEFAULT_ACTIVE_TAB);

  const { isAuthenticated, login, user } = useAuthentication();

  const removeListing = async (listingID: number) => {
    setIsProceeding(true);

    try {
      const response = await fcl.mutate({
        cadence: MARKET_REMOVE_LISTING,
        args: () => [fcl.arg(listingID, ft.UInt64)],
        limit: 9999,
      });

      await fcl.tx(response).onceSealed();
      navigate(Routes.Profile, { state: { activeTab: ProfileTabs.Listed } });
    } catch (err) {
      setIsProceeding(false);
    }
  };

  if (isLoading || !listing) {
    return (
      <div className={cn(styles.listingpage, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  const { imageCID, imagePath, owner, description, name, price, artist, resourceID } = listing;

  return (
    <div className={styles.listingpage}>
      <Header isAuthenticated={isAuthenticated} login={login} pathname={Routes.Main} />
      <div className={styles.listing}>
        <img src={getIPFSImage({ imageCID, imagePath })} alt={`Listing ID Image`} className={styles.image} />

        <div className={styles.info}>
          <div className={styles.infoRow}>
            <div className={styles.mainInfo}>
              <span className={styles.mainInfoName}>{name}</span>
              <span className={styles.mainInfoArtist}>{artist}</span>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.price}>
              <span className={styles.priceTitle}>{t((d) => d.listing.price)}</span>
              <div className={styles.priceAmount}>
                <FlowIcon />
                <span>{parseFloat(price).toFixed(3)} FLOW</span>
              </div>
            </div>

            {owner === user.addr ? (
              <button
                className={cn(styles.buttonPrimary, { [styles.proceedingButton]: isProceeding })}
                onClick={() => removeListing(listingId)}
              >
                {isProceeding ? (
                  <Spinner className={styles.proceedingLoader} size={Size.M} />
                ) : (
                  t((d) => d.listing.remove)
                )}
              </button>
            ) : (
              <Link to={`${Routes.Purchase}/${owner}/${listingId}`} className={cn(styles.button, styles.buttonPrimary)}>
                {t((d) => d.listing.buy)}
              </Link>
            )}
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
                  <span className={styles.detailsRowName}>Resource ID</span>
                  <span>{resourceID}</span>
                </div>
              </div>
            </TabsPane>
          </Tabs>
        </div>
      </div>
      <div className={styles.related}>
        <h3 className={styles.relatedTitle}>Похожие</h3>
        <div className={styles.relatedListings}>
          {related.map((listing) => (
            <ListingCard key={listing.listingID} {...listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listing;
