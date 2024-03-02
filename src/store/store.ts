import { configureStore, createReducer } from '@reduxjs/toolkit';
import { State } from '../types';
import { fillItems } from './actions';
import { createApi } from '../utils';

const initialState: State = {
  page: 1,
  itemsPerPage: 50,
  items: [],
};

const api = createApi();

export const store = configureStore({
  reducer: createReducer(initialState, (builder) =>
    builder.addCase(fillItems, (state, action) => {
      state.items = action.payload;
    })
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
