export const TYPE_PREFIX = 'user';

export type TItem = {
  name: string;
  description: string;
  thumbnail: string;
  artist: string;
  itemID: number;
  resourceID: number;
  owner: string;
  price?: number;
};

export type TListing = TItem;

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
