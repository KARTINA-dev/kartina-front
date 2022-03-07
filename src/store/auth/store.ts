import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TAuthState, TYPE_PREFIX } from './types';

const initialState: TAuthState = {
  user: null,
  isLoading: true,
};

const slice = createSlice({
  name: TYPE_PREFIX,
  initialState,
  reducers: {
    setState: (state, { payload }: PayloadAction<Partial<TAuthState>>) => {
      Object.assign(state, payload);
    },
  },
});

export const authActions = slice.actions;
export const authReducer = slice.reducer;
