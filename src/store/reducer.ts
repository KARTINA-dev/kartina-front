import { combineReducers } from 'redux';

import { userReducer } from './user/store';
import { galleryReducer } from './gallery/store';

export const createRootReducer = () => combineReducers({ user: userReducer, gallery: galleryReducer });
