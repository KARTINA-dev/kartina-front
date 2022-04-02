import React, { useEffect } from 'react';

import { useDispatch, useSelector } from '../../store/hooks';
import { userActions } from '../../store/user/store';

import styles from './Profile.module.scss';

const Profile: React.VFC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { addr } = user || {};

  useEffect(() => {
    if (addr) {
      dispatch(userActions.sideEffects.getUserProfile(addr));
    }
  }, [addr]);

  return <div className={styles.profile}>{addr}</div>;
};

export default Profile;
