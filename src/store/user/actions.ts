import { TListing, TListingsFilter } from '@/store/market/types';

import { createAsyncThunk } from '../helpers';
import api from '../../api';

import { TUserProfile, TYPE_PREFIX } from './types';

export const getUserProfile = createAsyncThunk<TUserProfile, string>(
  `${TYPE_PREFIX}/getUserProfile`,
  api.users.getUserProfile,
);

export const getUserListing = createAsyncThunk<TListing[], { address?: string; filter?: TListingsFilter }>(
  `${TYPE_PREFIX}/getListedItems`,
  api.market.getListings,
);
