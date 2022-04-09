import React, { useEffect } from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from '@/store/hooks';
import { userActions } from '@/store/user/store';
import { useTranslation } from '@/i18n';
import { Spinner } from '@/components/Spinner/Spinner';
import { Header } from '@/components/Header/Header';
import { Size } from '@/types/common';

import styles from './Profile.module.scss';

const Profile: React.VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const { addr, balance, items } = user || {};

  useEffect(() => {
    if (addr) {
      void dispatch(userActions.sideEffects.getUserProfile(addr));
    }
  }, [addr, dispatch]);

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
        <span> {t((d) => d.profile.balance, { balance })}</span>
      </Header>
      <div className={styles.content}></div>
    </div>
  );
};

export default Profile;
