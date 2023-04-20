import { ChangeEvent, useContext, useRef } from 'react';
import { PlaceContext } from '@/contexts';
import { SearchResults } from './';

export const SearchBar = () => {
  const { searchPlacesByTerm } = useContext(PlaceContext);
  const debounceRef = useRef<NodeJS.Timeout>()

  const handleQueryChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm( query );
    }, 1000)
  }

  return (
    <div className='max-w-[18rem] fixed top-5 left-5 bg-gray-100 rounded-md py-2 px-4'>
      <input
        className='w-full py-1 px-2 rounded-md border border-blue-500 outline-none mb-2'
        type="text"
        name="search" 
        id="search"
        placeholder='Ingrese un lugar'
        onChange={ handleQueryChanged }
      />

      <SearchResults />
    </div>
  )
}
