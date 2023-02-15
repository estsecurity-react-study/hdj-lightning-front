import { PropsWithChildren } from 'react';
import tw from 'twin.macro';

interface MessageProps {
  me?: boolean;
}

function Message({ children, me = false }: PropsWithChildren<MessageProps>) {
  return (
    <div
      css={[
        tw`inline-block max-w-[50%] py-3 px-5 rounded-lg`,
        tw`break-words`,
        me ? tw`bg-[rgb(var(--lightning-color1))] float-right` : tw`bg-white`,
      ]}
    >
      {children}
    </div>
  );
}

export default Message;
