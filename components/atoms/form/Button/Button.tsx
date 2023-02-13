import { ComponentProps, useMemo } from 'react';

// import styles from './Button.module.css';

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

const styles: { [kind in ButtonKind]: string } = {
  primary:
    'bg-[rgb(var(--lightning-color1))] enabled:hover:bg-[rgba(var(--lightning-color1),0.6)] enabled:hover:text-[rgb(var(--lightning-color4))] enabled:active:transition-none enabled:active:bg-[rgba(var(--lightning-color2))]',
  submit:
    'bg-[rgb(var(--lightning-color4))] text-white enabled:hover:bg-[rgba(var(--lightning-color1),0.6)] enabled:hover:text-[rgb(var(--lightning-color4))] enabled:active:transition-none enabled:active:bg-[rgba(var(--lightning-color2))]',
  secondery: 'bg-[rgba(var(--lightning-color4),0.6)] text-white',
  ghost: 'bg-[rgb(var(--lightning-color3))]',
  text: 'underline bg-inherit text-[rgb(var(--lightning-color4))] enabled:hover:text-[rgba(var(--lightning-color4),0.5)] px-0 py-0',
  google: '',
  kakao: '',
  naver: '',
};

function Button({ kind = 'primary', children, ...rest }: ButtonProps) {
  const buttonKindStyles = useMemo(() => styles[kind], [kind]);

  return (
    <button
      className={`w-full cursor-pointer px-6 py-3 rounded-lg bg-white text-[rgb(var(--lightning-color4))] transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm font-light ${buttonKindStyles}`}
      {...rest}
    >
      {children}
    </button>
  );
  // return (
  //   <button className={`${styles.base} ${buttonKindStyles}`} {...rest}>
  //     {children}
  //   </button>
  // );
}

export default Button;
