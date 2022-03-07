import { createAsyncThunk as createAsyncThunkDefault } from '@reduxjs/toolkit';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { AsyncThunkOptions } from '@reduxjs/toolkit/src/createAsyncThunk';

import { AsyncThunkConfig } from './types';

export const createAsyncThunk = <Return = void, Payload = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Return, Payload, AsyncThunkConfig>,
  options?: AsyncThunkOptions<Payload, AsyncThunkConfig>,
) => createAsyncThunkDefault<Return, Payload, AsyncThunkConfig>(typePrefix, payloadCreator, options);
