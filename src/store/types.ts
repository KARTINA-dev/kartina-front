import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import { store } from './index';

export type TAppState = ReturnType<typeof store.getState>;
export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>;
export type AsyncThunkConfig = {
  state: TAppState;
  dispatch: TDispatch;
};
