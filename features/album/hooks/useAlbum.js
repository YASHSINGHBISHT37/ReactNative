import { useQuery } from '@tanstack/react-query';
import { getAlbum } from '../../../services/musicApi';

export const useAlbum = (browseId) => {
  console.log('Fetching album with ID:', browseId)
  return useQuery({
    queryKey: ['album', browseId],
    queryFn: () => getAlbum(browseId),
    enabled: !!browseId, // Only fetch when browseId exists
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
};