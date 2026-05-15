// features/search/hooks/useSearch.js
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { searchMusic } from '../../../services/musicApi';

export const useSearch = (query, filter = 'songs') => {
  const [searchQuery, setSearchQuery] = useState('');

  return {
    results: useQuery({
      queryKey: ['search', query, filter],
      queryFn: () => searchMusic(query, filter),
      enabled: !!query && query.trim().length > 0,
      staleTime: 1000 * 60 * 10,
    }),
    setSearchQuery,
    searchQuery,
  };
};