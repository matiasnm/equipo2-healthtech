import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../services/user';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });
};
