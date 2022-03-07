import { combineReducers } from 'redux';

import { authReducer } from './auth/store';

export const createRootReducer = () => combineReducers({ auth: authReducer });
