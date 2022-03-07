export const TYPE_PREFIX = 'auth';

export type TUserInfo = {
  loggedIn: boolean;
};

export type TAuthState = {
  user: TUserInfo | null;
  isLoading: boolean;
};
