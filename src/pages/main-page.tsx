import { useEffect } from 'react';
import { fetchItems, useAppDispatch, useAppSelector } from '../store';

export function MainPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((store) => store.items);
  const itemsPerPage = useAppSelector((store) => store.itemsPerPage);

  console.log(items);

  useEffect(() => {
    dispatch(fetchItems({ offset: 0, limit: itemsPerPage }));
  }, [dispatch, itemsPerPage]);

  return <div>Main page</div>;
}
