import { createAction } from '@reduxjs/toolkit';
import { Fields, Item } from '../types';

export const fillItems = createAction<Item[], 'items/fill'>('items/fill');

export const setFields = createAction<Fields, 'fields/set'>('fields/set');

export const setIsFiltered = createAction<boolean, 'isFiltered/set'>(
  'isFiltered/set'
);

export const fillIds = createAction<string[], 'ids/set'>('ids/set');

export const setIsLoading = createAction<boolean, 'isLoading/set'>(
  'isLoading/set'
);
