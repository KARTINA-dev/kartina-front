import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import cn from 'classnames';
import { InputNumber } from 'antd';

import { useTranslation } from '@/i18n';
import { Header } from '@/components/Header/Header';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { getIPFSImage } from '@/helpers/getIPFSImage';
import { Routes } from '@/constants/routes';
import { ReactComponent as HeartIcon } from '@/assets/icons/heart.svg';
import { ReactComponent as ShareIcon } from '@/assets/icons/share.svg';
import { ReactComponent as OpenIcon } from '@/assets/icons/open.svg';
import { ReactComponent as FlowLogo } from '@/assets/flowLogo.svg';
import { Tabs, TabsPane } from '@/components/Tabs/Tabs';
import { ListingTabs } from '@/pages/Listing/types';
import { useAuthentication } from '@/helpers/useAuthentication';

import styles from './Item.module.scss';
import { useItemInfo } from './hooks';

const Item: React.VFC = () => {
  const { t } = useTranslation();
  const { address, itemID } = useParams();
  const { item, isLoading } = useItemInfo(address, Number(itemID));
  const [price, setPrice] = useState<string>();
  const DEFAULT_ACTIVE_TAB = ListingTabs.Description;

  const [activeTab, setActiveTab] = useState<ListingTabs>(DEFAULT_ACTIVE_TAB);

  const { isAuthenticated, login, user } = useAuthentication();

  if (isLoading || !item) {
    return (
      <div className={cn(styles.listingpage, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  const onPriceChange = (value: string) => {
    setPrice(value);
  };

  const { imageCID, imagePath, owner, description, name, artist } = item;
  const listLink = price ? `${Routes.List}/${owner}/${itemID}` : '#';

  return (
    <div className={styles.itempage}>
      <Header isAuthenticated={isAuthenticated} login={login} pathname={Routes.Main} />
      <div className={styles.listing}>
        <img src={getIPFSImage({ imageCID, imagePath })} alt={`Item Image`} className={styles.image} />

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
            <div className={styles.infoRow}>
              <InputNumber
                onChange={onPriceChange}
                placeholder={'0.000'}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className={styles.priceInput}
                addonAfter={
                  <div className={styles.flowLogoContainer}>
                    <FlowLogo className={styles.flowLogo} />
                  </div>
                }
              />
              <div className={styles.buttons}>
                {owner === user.addr && (
                  <Link
                    to={listLink}
                    state={price && { price: parseFloat(price).toFixed(3) }}
                    className={cn(styles.button, styles.buttonPrimary)}
                  >
                    {t((d) => d.item.list)}
                  </Link>
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
                    <span className={styles.detailsRowName}>{t((d) => d.item.creator)}</span>
                    <span>Didi Gallery</span>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsRowName}>{t((d) => d.item.owner)}</span>
                    <span>{owner}</span>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsRowName}>{t((d) => d.item.blockchain)}</span>
                    <span>FLOW</span>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsRowName}>{t((d) => d.item.tokenId)}</span>
                    <span>{itemID}</span>
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

export default Item;
