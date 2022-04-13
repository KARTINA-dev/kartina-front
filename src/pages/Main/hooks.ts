import * as fcl from '@onflow/fcl';
import { useEffect } from 'react';

import { userActions } from '@/store/user/store';
import { useDispatch, useSelector } from '@/store/hooks';
import { TUserProfile } from '@/store/user/types';

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const { isLoading, ...user } = useSelector((state) => state.user);

  useEffect(() => {
    fcl.currentUser().subscribe((currentUser: TUserProfile) => {
      const user = currentUser?.loggedIn ? currentUser : null;

      dispatch(userActions.setState({ ...user, isLoading: false }));
    });
  }, [dispatch]);

  return {
    user,
    isAuthenticated: Boolean(user.addr),
    login: fcl.logIn,
    logout: fcl.unauthenticate,
    isLoading,
  };
};
