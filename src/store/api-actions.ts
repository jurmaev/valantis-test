import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch } from './store';
import { Item, State } from '../types';
import { fillItems } from './actions';

export const fetchItems = createAsyncThunk<
  void,
  { offset: number; limit: number },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('items/fetch', async ({ offset, limit }, { extra: api, dispatch }) => {
  const { data } = await api.post<Item[]>('/', {
    action: 'get_ids',
    params: { offset, limit },
  });
  console.log(data);
  dispatch(fillItems(data));
});
