import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TMarketState, TYPE_PREFIX } from './types';
import * as sideEffects from './actions';

const initialState: TMarketState = {
  collections: [],
  isLoading: true,
};

const slice = createSlice({
  name: TYPE_PREFIX,
  initialState,
  reducers: {
    setState: (state, { payload }: PayloadAction<Partial<TMarketState>>) => {
      Object.assign(state, payload);
    },
    resetState: () => initialState,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(sideEffects.getUserProfile.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(sideEffects.getUserProfile.fulfilled, (state, { payload }) => {
  //     return { ...state, ...payload, isLoading: false };
  //   });
  // },
});

export const userActions = {
  sideEffects,
  ...slice.actions,
};
export const userReducer = slice.reducer;
