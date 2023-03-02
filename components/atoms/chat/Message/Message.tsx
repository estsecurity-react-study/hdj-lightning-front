import { CSSInterpolation } from '@emotion/css';
import { PropsWithChildren } from 'react';
import tw from 'twin.macro';

interface MessageProps {
  css?: CSSInterpolation;
}

function Message({ children, ...rest }: PropsWithChildren<MessageProps>) {
  return (
    <p css={[tw`inline-block py-3 px-5 rounded-lg`, tw`break-words`]} {...rest}>
      {children}
    </p>
  );
}

export default Message;
