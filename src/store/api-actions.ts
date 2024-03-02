import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch } from './store';
import { FiltersType, Item, ResponseResult, State } from '../types';
import { fillItems, setFields } from './actions';

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

export const fetchFields = createAsyncThunk<
  void,
  { offset: number; limit: number },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fields/fetch', async ({ offset, limit }, { extra: api, dispatch }) => {
  const { data: price } = await api.post<ResponseResult<number[]>>('/', {
    action: 'get_fields',
    params: {
      field: 'price',
      offset,
      limit,
    },
  });
  const { data: brand } = await api.post<ResponseResult<string[]>>('/', {
    action: 'get_fields',
    params: {
      field: 'brand',
      offset,
      limit,
    },
  });
  dispatch(
    setFields({
      price: [...new Set(price.result)],
      brand: [...new Set(brand.result.filter((name) => name))],
    })
  );
});

export const filter = createAsyncThunk<
  void,
  FiltersType,
  { state: State; extra: AxiosInstance }
>('filter', async (filters, { extra: api }) => {
  const { data } = await api.post<ResponseResult<string[]>>('/', {
    action: 'filter',
    params: filters,
  });
  console.log(data);
});
