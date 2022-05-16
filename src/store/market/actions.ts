import { createAsyncThunk } from '../helpers';
import api from '../../api';

import { TYPE_PREFIX, TListing, TListingsFilter } from './types';

export const getUserListing = createAsyncThunk<TListing[], { address?: string; filter?: TListingsFilter }>(
  `${TYPE_PREFIX}/getListedItems`,
  api.market.getListings,
);
