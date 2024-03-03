import { useEffect } from 'react';
import {
  fetchFields,
  fetchItems,
  fetchItemsByIds,
  useAppDispatch,
  useAppSelector,
} from '../store';
import { Filters, Pagination, Spinner } from '../components';
import { useSearchParams } from 'react-router-dom';

export function MainPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((store) => store.items);
  const itemsPerPage = useAppSelector((store) => store.itemsPerPage);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) ?? 1;
  const isFiltered = useAppSelector((store) => store.isFiltered);
  const ids = useAppSelector((store) => store.ids);
  const isLoading = useAppSelector((store) => store.isLoading);

  useEffect(() => {
    if (!isFiltered) {
      dispatch(
        fetchItems({
          offset: (page - 1) * itemsPerPage,
          limit: itemsPerPage,
        })
      );
      dispatch(
        fetchFields({
          offset: (page - 1) * itemsPerPage,
          limit: itemsPerPage,
        })
      );
    } else {
      dispatch(
        fetchItemsByIds(
          ids.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        )
      );
    }
  }, [dispatch, itemsPerPage, page, isFiltered, ids]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Filters />
      <main>
        <div className='container'>
          {items.length !== 0 ? (
            <div className='goods'>
              {items.map((item) => (
                <article key={item.id} className='goods__item'>
                  <p className='goods__id'>id: {item.id}</p>
                  <h1 className='goods__title'>Название: {item.product}</h1>
                  <p className='goods__brand'>
                    {item.brand && `Бренд: ${item.brand}`}
                  </p>
                  <span className='goods__price'>
                    Цена:{' '}
                    {item.price.toLocaleString('ru-RU', {
                      style: 'currency',
                      currency: 'RUB',
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <p className='message'>Товаров не найдено</p>
          )}
        </div>
        <Pagination isEnd={items.length === 0} />
      </main>
    </>
  );
}
