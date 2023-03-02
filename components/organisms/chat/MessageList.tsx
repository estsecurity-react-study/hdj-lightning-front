import { RefObject, use, useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';

import Message from '@components/atoms/chat/Message/Message';
import Avatar from '@components/atoms/profile/Avatar/Avatar';
import { Message as IMessage } from '@lib/hooks/useChats';
import useUser from '@lib/hooks/useUser';

const baseBeforeStyles = (me: boolean) => [
  tw`before:content-[''] before:absolute before:top-0`,
  tw`before:w-0 before:h-0 before:mt-1`,
  tw`before:border-[25px] before:border-transparent before:border-t-0`,
  me
    ? tw`before:border-l-[rgb(var(--lightning-color1))] before:right-0 before:border-r-0 before:-mr-2`
    : tw`before:border-r-[#fff] before:left-0 before:border-l-0 before:-ml-2`,
];

interface MessageListProps {
  messages: IMessage[] | undefined;
  scrollRef: RefObject<HTMLUListElement>;
}

// TODO: 코드 리팩토링, 프로필 표시 조건 추가(일정 시간이 지난 후 or 하루가 지난 후)
function MessageList({ messages, scrollRef }: MessageListProps) {
  const { user } = useUser();

  return (
    <ul
      css={[
        tw`w-full max-h-[calc(100%_-_3rem)] overflow-y-auto`,
        tw`flex flex-col`,
        tw`mr-4 px-4 pt-5`,
      ]}
      ref={scrollRef}
    >
      {messages?.map(({ user: _user, text, createAt }, index) => {
        const prevMessage = messages[index - 1];
        const prevAlsoSameUser =
          prevMessage && prevMessage.user.id === _user.id;
        const me = _user.id === user?.id;

        if (!prevAlsoSameUser) {
          return (
            <li key={`${createAt}_${_user.id}`} css={tw`mb-2`}>
              <div css={me && tw`float-right`}>
                <p
                  css={[
                    tw`mb-1`,
                    tw`font-light text-sm`,
                    me ? tw`mr-14 text-right` : tw`ml-14`,
                  ]}
                >
                  {_user.username}
                </p>
                <Message
                  css={[
                    tw`relative`,
                    ...baseBeforeStyles(me),
                    me ? tw`bg-[rgb(var(--lightning-color1))] ` : tw`bg-white`,
                  ]}
                >
                  {text}
                </Message>
                <Avatar
                  photoSrc={_user.photo}
                  username={_user.username}
                  css={[
                    tw`w-11 h-11`,
                    tw`-mt-[1.15rem]`,
                    me ? tw`float-right ml-3` : tw`float-left mr-3`,
                  ]}
                />
              </div>
            </li>
          );
        }

        return (
          <li
            key={`${createAt}_${_user.id}`}
            css={[tw`mb-2`, me ? tw`pr-14` : tw`pl-14`]}
          >
            <Message
              css={
                me
                  ? tw`bg-[rgb(var(--lightning-color1))] float-right`
                  : tw`bg-white`
              }
            >
              {text}
            </Message>
          </li>
        );
      })}
    </ul>
  );
}

export default MessageList;
