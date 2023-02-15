import { ComponentProps, useMemo } from 'react';
import tw, { TwStyle } from 'twin.macro';

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

const styles: {
  [kind in ButtonKind]: TwStyle;
} = {
  primary: tw`!bg-[rgb(var(--lightning-color1))] enabled:hover:!bg-[rgba(var(--lightning-color1),0.6)] enabled:hover:!text-[rgb(var(--lightning-color4))] enabled:active:transition-none enabled:active:!bg-[rgba(var(--lightning-color2))]`,
  submit: tw`!bg-[rgb(var(--lightning-color4))] !text-white enabled:hover:!bg-[rgba(var(--lightning-color1),0.6)] enabled:hover:!text-[rgb(var(--lightning-color4))] enabled:active:transition-none enabled:active:!bg-[rgba(var(--lightning-color2))]`,
  secondery: tw`!bg-[rgba(var(--lightning-color4),0.6)] !text-white`,
  ghost: tw`!bg-[rgb(var(--lightning-color3))]`,
  text: tw`underline bg-inherit !text-[rgb(var(--lightning-color4))] enabled:hover:!text-[rgba(var(--lightning-color4),0.5)] !px-0 !py-0`,
  google: tw``,
  kakao: tw``,
  naver: tw``,
};

function Button({ kind = 'primary', children, ...rest }: ButtonProps) {
  const buttonKindStyles = useMemo(() => styles[kind], [kind]);

  return (
    <button
      css={[
        buttonKindStyles,
        tw`w-full cursor-pointer bg-white text-[rgb(var(--lightning-color4))] px-6 py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm font-light`,
      ]}
      className={`${buttonKindStyles} `}
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
