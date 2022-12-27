import { PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './ErrorText.module.css';

interface ErrorTextProps {
  error?: FieldError;
}

function ErrorText({ error, children }: PropsWithChildren<ErrorTextProps>) {
  if (!error) {
    return null;
  }

  return (
    <div className={`${styles.base}`}>
      {error.type === 'required' ? '이 값은 필수로 입력해야 합니다!' : children}
    </div>
  );
}

export default ErrorText;
