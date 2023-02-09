import { ComponentProps, useMemo } from 'react';

import styles from './Button.module.css';

type ButtonKind =
  | 'primary'
  | 'secondery'
  | 'ghost'
  | 'text'
  | 'submit'
  | 'google'
  | 'kakao'
  | 'naver';

interface ButtonProps extends ComponentProps<'button'> {
  kind?: ButtonKind;
}

function Button({ kind = 'primary', children, ...rest }: ButtonProps) {
  const buttonKindStyles = useMemo(() => styles[kind], [kind]);

  return (
    <button className={`${styles.base} ${buttonKindStyles}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
