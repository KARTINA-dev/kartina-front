import { createAsyncThunk } from '@/store/helpers';
import { TCreateRequest, TGallery, TRequest, TYPE_PREFIX } from '@/store/gallery/types';
import api from '@/api';

export const getGallery = createAsyncThunk<TGallery, string>(
  `${TYPE_PREFIX}/getGalleryProfile`,
  api.gallery.getGallery,
);

export const getRequests = createAsyncThunk<TRequest[], string>(`${TYPE_PREFIX}/getRequests`, api.gallery.getRequests);

export const sendRequest = createAsyncThunk<TRequest, TCreateRequest>(
  `${TYPE_PREFIX}/sendRequest`,
  api.gallery.sendRequest,
);
