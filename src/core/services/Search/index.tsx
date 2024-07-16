import { createContext, useContext } from 'react';
import { SearchContextType } from './types';

const SearchContext = createContext({} as SearchContextType);

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchContext };