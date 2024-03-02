import { Item } from './item';

export type State = {
  page: number;
  itemsPerPage: number;
  items: Item[];
};
