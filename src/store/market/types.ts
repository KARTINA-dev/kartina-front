export const TYPE_PREFIX = 'market';

export type TListing = {
  name: string;
  description: string;
  imageCID: string;
  imagePath: string;
  artist: string;
  listingID: number;
  resourceID: number;
  owner: string;
  price: string;
};

export type TCollection = {
  name: string;
  gallery: string;
  listings: TListing;
};

export type TMarketState = {
  collections: TCollection[];
  isLoading: boolean;
};
