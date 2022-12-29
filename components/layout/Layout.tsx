import { PropsWithChildren } from 'react';
import Header from './Header/Header';

import styles from './Layout.module.css';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>{children}</div>
    </div>
  );
}

export default Layout;
