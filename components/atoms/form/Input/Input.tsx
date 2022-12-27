import { ComponentProps, PropsWithChildren } from 'react';
import styles from './Input.module.css';

interface InputProps extends ComponentProps<'input'> {}

function Input({ id, type, placeholder }: InputProps) {
  return (
    <input
      id={id}
      type={type}
      className={`${styles.base}`}
      placeholder={placeholder}
    />
  );
}

export default Input;
