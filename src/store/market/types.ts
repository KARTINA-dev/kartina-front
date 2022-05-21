import { TGallery } from '@/store/gallery/types';

export const TYPE_PREFIX = 'market';

export type TListing = {
  name: string;
  description: string;
  imageCID: string;
  imagePath: string;
  artist: string;
  listingID: number;
  resourceID: number;
  itemID: number;
  owner: string;
  price: string;
};

export type TCollection = {
  _id: string;
  name: string;
  gallery: TGallery;
  listings: TListing[];
  description?: string;
};

export enum ListingsSort {
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
  DATE_ASC = 'DATE_ASC',
}

export type TListingsFilter = { price: number; name: string; artists: string[]; sort: ListingsSort };

export type TArtist = {
  _id: string;
  name: string;
};

export type TMarketState = {
  collections: TCollection[];
  isLoading: boolean;
};
