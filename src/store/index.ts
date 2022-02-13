import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import { IS_PROD } from '../constants/env';

import { createRootReducer } from './reducer';

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: createRootReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
  devTools: !IS_PROD,
});
