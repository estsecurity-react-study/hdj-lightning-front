import useSWR from 'swr';
import { fetcher } from '../api';

const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/auth/me', fetcher, {
    refreshInterval: 1000 * 60 * 30,
  });

  return {
    isLogin: !!data && !error,
    user: data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
