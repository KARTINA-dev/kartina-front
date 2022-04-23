import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TUserState, TYPE_PREFIX } from './types';
import * as sideEffects from './actions';

const initialState: TUserState = {
  addr: null,
  loggedIn: false,
  balance: null,
  items: [],
  listings: [],
  isLoading: true,
};

const slice = createSlice({
  name: TYPE_PREFIX,
  initialState,
  reducers: {
    setState: (state, { payload }: PayloadAction<Partial<TUserState>>) => {
      Object.assign(state, payload);
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(sideEffects.getUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sideEffects.getUserProfile.fulfilled, (state, { payload }) => {
      return { ...state, ...payload, isLoading: false };
    });
    builder.addCase(sideEffects.getUserListing.fulfilled, (state, { payload }) => {
      return { ...state, ...payload, listings: payload, isLoading: false };
    });
  },
});

export const userActions = {
  sideEffects,
  ...slice.actions,
};
export const userReducer = slice.reducer;
