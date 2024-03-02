import { FormEvent, useRef } from 'react';
import { useAppSelector } from '../store';

export function Filters() {
  const brand = useAppSelector((store) => store.fields.brand);
  const price = useAppSelector((store) => store.fields.price);
  const nameRef = useRef<HTMLInputElement>(null);
  const brandRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLSelectElement>(null);

  function onSubmit(evt: FormEvent){
    evt.preventDefault()
    if(nameRef.current && brandRef.current && priceRef.current){
      
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
