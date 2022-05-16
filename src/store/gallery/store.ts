import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TGalleryState, TYPE_PREFIX } from './types';
import * as sideEffects from './actions';

const initialState: TGalleryState = {
  _id: null,
  name: null,
  address: null,
  country: null,
  requests: [],
  isLoading: true,
};

const slice = createSlice({
  name: TYPE_PREFIX,
  initialState,
  reducers: {
    setState: (state, { payload }: PayloadAction<Partial<TGalleryState>>) => {
      Object.assign(state, payload);
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    [sideEffects.getGallery, sideEffects.getRequests, sideEffects.sendRequest].forEach((action) => {
      builder.addCase(action.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(action.rejected, (state) => {
        state.isLoading = false;
      });
    });
    builder.addCase(sideEffects.getGallery.fulfilled, (state, { payload }) => {
      return { ...state, ...payload, isLoading: false };
    });
    builder.addCase(sideEffects.getRequests.fulfilled, (state, { payload }) => {
      return { ...state, requests: payload, isLoading: false };
    });
    builder.addCase(sideEffects.sendRequest.fulfilled, (state, { payload }) => {
      return { ...state, requests: [...state.requests, payload], isLoading: false };
    });
  },
});

export const galleryActions = {
  sideEffects,
  ...slice.actions,
};
export const galleryReducer = slice.reducer;
