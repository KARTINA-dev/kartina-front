import * as fcl from '@onflow/fcl';
import { useEffect } from 'react';

import { authActions } from '../../store/auth/store';
import { useDispatch, useSelector } from '../../store/hooks';
import { TUserInfo } from '../../store/auth/types';

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    fcl.currentUser().subscribe((currentUser: TUserInfo) => {
      const user = currentUser?.loggedIn ? currentUser : null;
      dispatch(authActions.setState({ user, isLoading: false }));
    });
  }, []);

  return {
    user,
    login: fcl.logIn,
    logout: fcl.unauthenticate,
    isLoading,
  };
};
