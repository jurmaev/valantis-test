import { configureStore, createReducer } from '@reduxjs/toolkit';
import { State } from '../types';
import { fillItems, setFields } from './actions';
import { api } from '../utils';

const initialState: State = {
  page: 1,
  itemsPerPage: 50,
  items: [],
  fields: {
    price: [],
    brand: [],
  },
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
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
