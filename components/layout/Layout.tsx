import { PropsWithChildren } from 'react';
import useSWR from 'swr';
import Header from './Header/Header';

import styles from './Layout.module.css';

function Layout({ children }: PropsWithChildren) {
  const { data, error } = useSWR('/auth/me');

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>{children}</div>
    </div>
  );
}

export default Layout;
