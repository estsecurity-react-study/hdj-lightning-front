import { ComponentProps, forwardRef } from 'react';

import styles from './Input.module.css';

interface InputProps extends ComponentProps<'input'> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, placeholder, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        className={`${styles.base}`}
        placeholder={placeholder}
        {...rest}
      />
    );
  },
);

export default Input;
