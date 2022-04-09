import * as fcl from '@onflow/fcl';
import { useEffect } from 'react';

import { userActions } from '@/store/user/store';
import { useDispatch, useSelector } from '@/store/hooks';
import { TUser } from '@/store/user/types';

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    fcl.currentUser().subscribe((currentUser: TUser) => {
      const user = currentUser?.loggedIn ? currentUser : null;

      dispatch(userActions.setState({ user, isLoading: false }));
    });
  }, [dispatch]);

  return {
    user,
    login: fcl.logIn,
    logout: fcl.unauthenticate,
    isLoading,
  };
};
