import { TypedUseSelectorHook, useDispatch as useDispatchHook, useSelector as useSelectorHook } from 'react-redux';

import { TAppState, TDispatch } from './types';

export const useDispatch = () => useDispatchHook<TDispatch>();
export const useSelector: TypedUseSelectorHook<TAppState> = useSelectorHook;
