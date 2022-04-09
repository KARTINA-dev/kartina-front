import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TUserState, TYPE_PREFIX } from './types';
import * as sideEffects from './actions';

const initialState: TUserState = {
  user: null,
  isLoading: true,
};

const slice = createSlice({
  name: TYPE_PREFIX,
  initialState,
  reducers: {
    setState: (state, { payload }: PayloadAction<Partial<TUserState>>) => {
      Object.assign(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sideEffects.getUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sideEffects.getUserProfile.fulfilled, (state, { payload }) => {
      state.user = { ...state.user, ...payload };
      state.isLoading = false;
    });
  },
});

export const userActions = {
  sideEffects,
  ...slice.actions,
};
export const userReducer = slice.reducer;
