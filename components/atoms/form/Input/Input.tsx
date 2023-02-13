import { ComponentProps, forwardRef } from 'react';

// import styles from './Input.module.css';

interface InputProps extends ComponentProps<'input'> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, placeholder, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        className="text-sm font-normal w-full h-9 outline-none border-2 border-[rgb(var(--lightning-color5))] rounded-lg p-2 bg-white transition enabled:hover:border-[rgb(var(--lightning-color2))] enabled:focus:transition-none enabled:focus:border-[rgba(var(--lightning-color1),0.8)] disabled:cursor-not-allowed disabled:opacity-80"
        placeholder={placeholder}
        {...rest}
      />
    );
  },
);

export default Input;
