import { TListing, TListingsFilter } from '@/store/market/types';

import { makeRequest } from './makeRequest';

const getUrl = (rest = '') => `/market${rest}`;

export const getListings = ({ address, filter }: { address?: string; filter?: TListingsFilter }) =>
  makeRequest<TListing[]>({ method: 'POST', url: getUrl(`/listings/${address || ''}`), body: filter });

export const getListing = (listingID: number, address?: string) =>
  makeRequest<TListing>({ method: 'GET', url: getUrl(`/listings/${address}/${listingID}`) });
