import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { useTranslation } from '@/i18n';
import { Spinner } from '@/components/Spinner/Spinner';
import { Size } from '@/types/common';
import { useDispatch, useSelector } from '@/store/hooks';
import { galleryActions } from '@/store/gallery/store';
import { useAuthentication } from '@/helpers/useAuthentication';
import { Header } from '@/components/Header/Header';
import { Routes } from '@/constants/routes';
import { Tabs, TabsPane } from '@/components/Tabs/Tabs';

import { ManageTabs } from './types';
import { Requests } from './components/Requests/Requests';
import { CreateRequest } from './components/CreateRequest/CreateRequest';
import styles from './Manage.module.scss';

const DEFAULT_ACTIVE_TAB = ManageTabs.Requests;

const Manage: React.VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<ManageTabs>(DEFAULT_ACTIVE_TAB);
  const { isAuthenticated, login, isLoading, user } = useAuthentication();
  const { address, name } = useSelector((state) => state.gallery);

  useEffect(() => {
    if (user.addr) {
      void dispatch(galleryActions.sideEffects.getGallery(user.addr));
    }
  }, [dispatch, user.addr]);

  if (!isAuthenticated || !address) {
    return (
      <div className={styles.login}>
        <h2 className={styles.loginTitle}>
          <b>KARTINA</b> — {t((d) => d.manage.login.label)}
        </h2>
        <button className={styles.loginButton} onClick={login}>
          {t((d) => d.manage.login.button)}
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn(styles.manage, styles.loading)}>
        <Spinner size={Size.L} />
      </div>
    );
  }

  return (
    <div className={styles.manage}>
      <Header isAuthenticated={isAuthenticated} login={login} pathname={Routes.Manage} galleryName={name} />
      <div className={styles.content}>
        <Tabs
          defaultActiveKey={DEFAULT_ACTIVE_TAB}
          onChange={(key) => setActiveTab(key as ManageTabs)}
          activeKey={activeTab}
        >
          <TabsPane key={ManageTabs.Requests} tab={t((d) => d.manage.requests.title)}>
            <Requests />
          </TabsPane>
          <TabsPane key={ManageTabs.Create} tab={t((d) => d.manage.create.title)}>
            <CreateRequest setActiveTab={setActiveTab} />
          </TabsPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Manage;
