export const TYPE_PREFIX = 'user';

export type TUser = {
  addr: string;
  loggedIn: boolean;
  balance: string;
  items: null;
};

export type TUserState = {
  user: TUser | null;
  isLoading: boolean;
};
