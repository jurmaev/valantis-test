import { configureStore, createReducer } from '@reduxjs/toolkit';
import { State } from '../types';
import {
  fillIds,
  fillItems,
  setFields,
  setIsFiltered,
  setIsLoading,
} from './actions';
import { api } from '../utils';

const initialState: State = {
  // page: 1,
  isFiltered: false,
  itemsPerPage: 50,
  items: [],
  fields: {
    price: [],
    brand: [],
  },
  ids: [],
  isLoading: false,
};

export const store = configureStore({
  reducer: createReducer(initialState, (builder) =>
    builder
      .addCase(fillItems, (state, action) => {
        const seen: { [key: string]: boolean } = {};
        const items = action.payload;
        state.items = items.filter((item) => {
          return Object.prototype.hasOwnProperty.call(seen, item.id)
            ? false
            : (seen[item.id] = true);
        });
      })
      .addCase(setFields, (state, action) => {
        state.fields = action.payload;
      })
      .addCase(setIsFiltered, (state, action) => {
        state.isFiltered = action.payload;
      })
      .addCase(fillIds, (state, action) => {
        state.ids = action.payload;
      })
      .addCase(setIsLoading, (state, action) => {
        state.isLoading = action.payload;
      })
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
