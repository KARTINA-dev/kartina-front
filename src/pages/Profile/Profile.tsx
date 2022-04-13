import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import * as fcl from '@onflow/fcl';
import * as ft from '@onflow/types';

import { useDispatch, useSelector } from '@/store/hooks';
import { userActions } from '@/store/user/store';
import { useTranslation } from '@/i18n';
import { Spinner } from '@/components/Spinner/Spinner';
import { Header } from '@/components/Header/Header';
import { Size } from '@/types/common';
import { ItemCard } from '@/components/ItemCard/ItemCard';
import { Tabs, TabsPane } from '@/components/Tabs/Tabs';
import { ProfileTabs } from '@/pages/Profile/types';
import { MARKET_CREATE_LISTING } from '@/cadence/transactions/market/create_listing';

import styles from './Profile.module.scss';

const DEFAULT_ACTIVE_TAB = ProfileTabs.Collection;

const Profile: React.VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<ProfileTabs>(DEFAULT_ACTIVE_TAB);

  const { addr, balance, items, listings, isLoading } = useSelector((state) => state.user);

  const createListing = useCallback(
    async (id: number) => {
      if (!addr) {
        return;
      }

      console.log(id);

      const response = await fcl.mutate({
        cadence: MARKET_CREATE_LISTING,
        args: () => [fcl.arg(id, ft.UInt64), fcl.arg('1.0', ft.UFix64)],
        limit: 9999,
      });

      console.log(response);

      console.log(await fcl.tx(response).onceSealed());
    },
    [addr],
  );

  useEffect(() => {
    if (addr) {
      void dispatch(userActions.sideEffects.getUserProfile(addr));
    }
  }, [addr, dispatch]);

  useEffect(() => {
    if (addr && activeTab === ProfileTabs.Listed) {
      void dispatch(userActions.sideEffects.getUserListing(addr));
    }
  }, [addr, activeTab, dispatch]);

  if (isLoading) {
    return (
      <div className={cn(styles.profile, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <Header>
        <span>{addr}</span>
        <span> {t((d) => d.flow.amount, { amount: balance })}</span>
      </Header>
      <div className={styles.content}>
        <Tabs
          className={styles.contentTabs}
          defaultActiveKey={DEFAULT_ACTIVE_TAB}
          onChange={(key) => setActiveTab(key as ProfileTabs)}
          activeKey={activeTab}
        >
          <TabsPane key={ProfileTabs.Collection} tab={t((d) => d.profile.collection.title)}>
            {items?.length ? (
              <>
                <p className={styles.contentDescription}>{t((d) => d.profile.collection.description)}</p>
                <div className={styles.collection}>
                  {items.map((item) => (
                    <ItemCard key={item.itemID} {...item} createListing={createListing} />
                  ))}
                </div>
              </>
            ) : (
              <p className={styles.contentDescription}>{t((d) => d.profile.empty.description)}</p>
            )}
          </TabsPane>
          <TabsPane key={ProfileTabs.Listed} tab={t((d) => d.profile.listed.title)}>
            {listings?.length ? (
              <>
                <p className={styles.contentDescription}>{t((d) => d.profile.collection.description)}</p>
                <div className={styles.collection}>
                  {items.map((item) => (
                    <ItemCard key={item.itemID} {...item} />
                  ))}
                </div>{' '}
              </>
            ) : (
              <p className={styles.contentDescription}>{t((d) => d.profile.empty.description)}</p>
            )}
          </TabsPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
