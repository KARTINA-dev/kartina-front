import React from 'react';
import { BrowserRouter, Routes as BaseRoutes, Route } from 'react-router-dom';

import { ADDRESS_PARAM, ITEMS_ITEM_ID_PARAM, MARKET_LISTING_ID_PARAM, Routes } from '@/constants/routes';
import { PrivateRoute } from '@/utils/PrivateRoute';
import List from '@/pages/List/List';

import Main from './Main/Main';
import Market from './Market/Market';
import Profile from './Profile/Profile';
import Item from './Item/Item';
import Listing from './Listing/Listing';
import Purchase from './Purchase/Purchase';

export const Root: React.VFC = () => (
  <BrowserRouter>
    <BaseRoutes>
      <Route path={Routes.Main} element={<Main />} />
      <Route path={Routes.Market} element={<Market />} />
      <Route path={`${Routes.Item}${ADDRESS_PARAM}${ITEMS_ITEM_ID_PARAM}`} element={<Item />} />
      <Route path={`${Routes.Listing}${ADDRESS_PARAM}${MARKET_LISTING_ID_PARAM}`} element={<Listing />} />
      <Route path={`${Routes.Purchase}${ADDRESS_PARAM}${MARKET_LISTING_ID_PARAM}`} element={<Purchase />} />
      <Route path={`${Routes.List}${ADDRESS_PARAM}${ITEMS_ITEM_ID_PARAM}`} element={<List />} />
      <Route path={Routes.Profile} element={<PrivateRoute component={Profile} />} />
    </BaseRoutes>
  </BrowserRouter>
);
