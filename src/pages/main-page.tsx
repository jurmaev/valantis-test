import { useEffect } from 'react';
import { fetchItems, useAppDispatch, useAppSelector } from '../store';
import { Pagination } from '../components';
import { useSearchParams } from 'react-router-dom';

export function MainPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((store) => store.items);
  const itemsPerPage = useAppSelector((store) => store.itemsPerPage);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';

  useEffect(() => {
    dispatch(
      fetchItems({ offset: Number(page) * itemsPerPage, limit: itemsPerPage })
    );
  }, [dispatch, itemsPerPage, page]);

  return (
    <main>
      <div className='container goods'>
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
      <Pagination />
    </main>
  );
}
