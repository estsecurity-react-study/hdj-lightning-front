import { ComponentProps } from 'react';
import tw from 'twin.macro';

interface LabelProps
  extends Pick<ComponentProps<'label'>, 'htmlFor' | 'children'> {}

function Label({ children, htmlFor }: LabelProps) {
  return (
    <label
      css={[tw`text-[rgb(var(--lightning-color4))]`, tw`mb-[0.3rem]`]}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

export default Label;
