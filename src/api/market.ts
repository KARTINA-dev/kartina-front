import { TListing } from '@/store/user/types';

import { makeRequest } from './makeRequest';

const getUrl = (rest = '') => `/market${rest}`;

export const getListings = (address?: string) =>
  makeRequest<TListing[]>({ method: 'GET', url: getUrl(`/listings/${address}`) });

export const getListing = (listingID: number, address?: string) =>
  makeRequest<TListing>({ method: 'GET', url: getUrl(`/listings/${address}/${listingID}`) });

export const getCollections = () => makeRequest<TListing[]>({ method: 'GET', url: getUrl(`/`) });
