import { PropsWithChildren } from 'react';
import useSWR from 'swr';

function Layout({ children }: PropsWithChildren) {
  const { data, error } = useSWR('/auth/me');

  return (
    <div>
      {error ? 'not login!' : 'login!'}
      {children}
    </div>
  );
}

export default Layout;
