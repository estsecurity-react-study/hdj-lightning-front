import { PropsWithChildren } from 'react';

import styles from './ErrorText.module.css';

function ErrorText({ children }: PropsWithChildren) {
  if (!children) {
    return null;
  }

  return <div className={`${styles.base}`}>{children}</div>;
}

export default ErrorText;
