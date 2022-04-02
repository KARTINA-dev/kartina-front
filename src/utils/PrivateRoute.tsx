import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

import { useSelector } from '../store/hooks';
import { Routes } from '../constants/routes';

export const PrivateRoute: React.FC<{ component: ComponentType }> = ({ component }) => {
  const RouteComponent = component;
  const { user } = useSelector((state) => state.user);

  return user ? <RouteComponent /> : <Navigate to={Routes.Main} />;
};
