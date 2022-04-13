import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

import { useSelector } from '@/store/hooks';
import { Routes } from '@/constants/routes';

export const PrivateRoute: React.FC<{ component: ComponentType }> = ({ component }) => {
  const RouteComponent = component;
  const { addr } = useSelector((state) => state.user);

  return addr ? <RouteComponent /> : <Navigate to={Routes.Main} />;
};
