import { createAsyncThunk } from '../helpers';
import api from '../../api';

import { TUser, TYPE_PREFIX } from './types';

export const getUserProfile = createAsyncThunk<TUser, string>(`${TYPE_PREFIX}/getProjects`, api.users.getUserProfile);
