import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch } from './store';
import { Item, ResponseResult, State } from '../types';
import { fillItems } from './actions';

export const fetchItems = createAsyncThunk<
  void,
  { offset: number; limit: number },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('items/fetch', async ({ offset, limit }, { extra: api, dispatch }) => {
  const { data: ids } = await api.post<ResponseResult<string[]>>('/', {
    action: 'get_ids',
    params: { offset, limit },
  });
  const { data: items } = await api.post<ResponseResult<Item[]>>('/', {
    action: 'get_items',
    params: { ids: ids.result },
  });
  dispatch(fillItems(items.result));
});
