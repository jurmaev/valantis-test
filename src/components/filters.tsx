import { FormEvent, useEffect, useRef } from 'react';
import { filter, useAppDispatch, useAppSelector } from '../store';
import { FiltersType } from '../types';
import { useSearchParams } from 'react-router-dom';

export function Filters() {
  const dispatch = useAppDispatch();
  const brand = useAppSelector((store) => store.fields.brand);
  const price = useAppSelector((store) => store.fields.price);
  const nameRef = useRef<HTMLInputElement>(null);
  const brandRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLSelectElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (nameRef.current && brandRef.current && priceRef.current) {
      nameRef.current.value = searchParams.get('product') ?? '';
      brandRef.current.value = searchParams.get('brand') ?? '';
      priceRef.current.value = searchParams.get('price') ?? '';
    }
  }, [searchParams]);

  function onSubmit(evt: FormEvent) {
    evt.preventDefault();
    if (nameRef.current && brandRef.current && priceRef.current) {
      const filters: FiltersType = {};
      if (nameRef.current.value !== '') {
        filters.product = nameRef.current.value;
        searchParams.set('product', nameRef.current.value);
      } else {
        searchParams.delete('product');
      }
      if (brandRef.current.value !== '') {
        filters.brand = brandRef.current.value;
        searchParams.set('brand', brandRef.current.value);
      } else {
        searchParams.delete('brand');
      }
      if (priceRef.current.value !== '') {
        filters.price = Number(priceRef.current.value);
        searchParams.set('price', priceRef.current.value);
      } else {
        searchParams.delete('price');
      }
      // if (
      //   nameRef.current.value !== '' ||
      //   brandRef.current.value !== '' ||
      //   priceRef.current.value !== ''
      // ) {
      //   dispatch(setIsFiltered(true));
      // } else {
      //   dispatch(setIsFiltered(false));
      // }
      searchParams.set('page', '1')
      setSearchParams(searchParams);
      dispatch(filter(filters));
    }
  }

  return (
    <aside className='aside'>
      <h2>Фильтры</h2>

      <form className='form'>
        <label className='form__label' htmlFor='name'>
          Название
        </label>
        <input
          className='form__input'
          type='text'
          placeholder='Введите название'
          id='name'
          ref={nameRef}
        />

        <label className='form__label' htmlFor='brand'>
          Выберите бренд:
        </label>
        <select ref={brandRef} className='form__select' name='brand' id='brand'>
          <option value=''>Бренд</option>
          {brand.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <label className='form__label' htmlFor='brand'>
          Выберите цену:
        </label>
        <select ref={priceRef} className='form__select' name='price' id='price'>
          <option value=''>Цена</option>
          {price.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <button onClick={onSubmit} className='form__btn' type='submit'>
          Фильтровать
        </button>
      </form>
    </aside>
  );
}
