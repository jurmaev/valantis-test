import { createAction } from '@reduxjs/toolkit';
import { Item } from '../types';

export const fillItems = createAction<Item[], 'items/fill'>('items/fill')
