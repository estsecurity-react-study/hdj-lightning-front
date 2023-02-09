import { ComponentProps } from 'react';

import styles from './Label.module.css';

interface LabelProps
  extends Pick<ComponentProps<'label'>, 'htmlFor' | 'children'> {}

function Label({ children, htmlFor }: LabelProps) {
  return (
    <label className={styles.base} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default Label;
