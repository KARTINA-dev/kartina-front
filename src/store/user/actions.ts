import { createAsyncThunk } from '../helpers';
import api from '../../api';

import { TUserProfile, TYPE_PREFIX, TListing } from './types';

export const getUserProfile = createAsyncThunk<TUserProfile, string>(
  `${TYPE_PREFIX}/getProjects`,
  api.users.getUserProfile,
);

export const getUserListing = createAsyncThunk<TListing[], string>(
  `${TYPE_PREFIX}/getListedItems`,
  api.market.getListings,
);
