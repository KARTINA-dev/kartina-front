export const TYPE_PREFIX = 'user';

export type TUser = {
  addr: string;
  loggedIn: boolean;
  items: null;
};

export type TUserState = {
  user: TUser | null;
  isLoading: boolean;
};
