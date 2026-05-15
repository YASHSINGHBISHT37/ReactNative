import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,      // ⬅️ cache band
      staleTime: 0,      // ⬅️ yeh bhi
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});