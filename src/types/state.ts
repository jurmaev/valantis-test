import { Fields } from './fields';
import { Item } from './item';

export type State = {
  // page: number;
  isFiltered: boolean;
  itemsPerPage: number;
  items: Item[];
  fields: Fields;
  ids: string[];
  isLoading: boolean;
};
