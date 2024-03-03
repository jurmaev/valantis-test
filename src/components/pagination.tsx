import { useNavigate, useSearchParams } from 'react-router-dom';

type PaginationProps = {
  isEnd: boolean;
};

export function Pagination({ isEnd }: PaginationProps) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const navigate = useNavigate();

  function onPreviousPageClick() {
    searchParams.set('page', String(Number(page) - 1));
    navigate(`/?${searchParams.toString()}`);
  }

  function onNextPageClick() {
    searchParams.set('page', String(Number(page) + 1));
    navigate(`/?${searchParams.toString()}`);
  }

  return (
    <div className='container pagination'>
      <button
        type='button'
        className='pagination__control'
        disabled={page === '1'}
        onClick={onPreviousPageClick}>
        Предыдущая
      </button>
      <span className='pagination__page'>{page}</span>
      <button
        type='button'
        className='pagination__control'
        onClick={onNextPageClick}
        disabled={isEnd}>
        Следующая
      </button>
    </div>
  );
}
