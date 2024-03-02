import { createAction } from '@reduxjs/toolkit';
import { Fields, Item } from '../types';

export const fillItems = createAction<Item[], 'items/fill'>('items/fill');

export const setFields = createAction<Fields, 'fields/set'>('fields/set');
