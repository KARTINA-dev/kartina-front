export const TYPE_PREFIX = 'user';

export type TItem = {
  name: string;
  description: string;
  imageCID: string;
  imagePath: string;
  artist: string;
  itemID: number;
  resourceID: number;
  owner: string;
};

export type TListing = {
  name: string;
  description: string;
  imageCID: string;
  imagePath: string;
  artist: string;
  listingID: number;
  resourceID: number;
  owner: string;
  price: number;
};

export type TUserProfile = {
  addr: string | null;
  loggedIn: boolean;
  balance: string | null;
  items: TItem[];
  listings: TListing[];
};

export type TUserState = TUserProfile & {
  isLoading: boolean;
};
