import { combineReducers } from 'redux';

import { userReducer } from './user/store';

export const createRootReducer = () => combineReducers({ user: userReducer });
