import React from 'react';
import { BrowserRouter, Routes as BaseRoutes, Route } from 'react-router-dom';

import { Routes } from '@/constants/routes';
import { PrivateRoute } from '@/utils/PrivateRoute';

import Main from './Main/Main';
import Market from './Market/Market';
import Profile from './Profile/Profile';

export const Root: React.VFC = () => (
  <BrowserRouter>
    <BaseRoutes>
      <Route path={Routes.Main} element={<Main />} />
      <Route path={Routes.Market} element={<Market />} />
      <Route path={Routes.Profile} element={<PrivateRoute component={Profile} />} />
    </BaseRoutes>
  </BrowserRouter>
);
