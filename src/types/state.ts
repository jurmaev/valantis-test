import { Fields } from './fields';
import { Item } from './item';

export type State = {
  isFiltered: boolean;
  itemsPerPage: number;
  items: Item[];
  fields: Fields;
  ids: string[];
  isLoading: boolean;
};
