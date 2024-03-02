import { Fields } from './fields';
import { Item } from './item';

export type State = {
  // page: number;
  itemsPerPage: number;
  items: Item[];
  fields: Fields;
};
