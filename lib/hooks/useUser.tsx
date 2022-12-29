import useSWR from 'swr';

const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/auth/me');

  return {
    isLogin: !!data && !error,
    user: data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
