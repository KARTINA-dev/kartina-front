import * as fcl from '@onflow/fcl';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { userActions } from '@/store/user/store';
import { useDispatch, useSelector } from '@/store/hooks';
import { TUserProfile } from '@/store/user/types';
import Routes from '@/constants/routes';

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, ...user } = useSelector((state) => state.user);

  const logout = () => {
    fcl.unauthenticate();
    dispatch(userActions.resetState());
    navigate(Routes.Main);
  };

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
    logout,
    isLoading,
  };
};
