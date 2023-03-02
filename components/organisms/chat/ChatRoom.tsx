import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import tw from 'twin.macro';
import * as yup from 'yup';

import Button from '@components/atoms/form/Button/Button';
import Input from '@components/atoms/form/Input/Input';
import { Message as IMessage } from '@lib/hooks/useChats';

import MessageList from './MessageList';
import { chatSchema } from './schema';

type ChatInput = yup.InferType<typeof chatSchema>;

interface ChatRoomProps {
  info:
    | { messages: IMessage[] | undefined; roomId: number | undefined }
    | undefined;
  onSend: (text: string) => void;
  onFocus?: () => void;
}

// TODO: 가장 아래 스크롤이 아닌 상태에서 아래로 바로가는 숏컷 표시, 채팅방 전환 시 자동 스크롤
function ChatRoom({ info, onSend, onFocus }: ChatRoomProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<ChatInput>({
    resolver: yupResolver(chatSchema),
    mode: 'onChange',
    defaultValues: { text: '' },
  });
  // const [isScrollBottom, setIsScrollBottom] = useState<boolean | undefined>();
  const listElement = useRef<HTMLUListElement>(null);
  const abled = useMemo(() => !!info?.messages, [info?.messages]);

  const handleSend: SubmitHandler<ChatInput> = useCallback(
    ({ text }) => {
      onSend?.(text);
      reset();
    },
    [onSend, reset],
  );

  useEffect(() => {
    if (!listElement.current) return;

    const { scrollHeight, scrollTop, clientHeight } = listElement.current;

    // if (scrollTop === 0) {
    //   listElement.current.scrollTop = scrollHeight - clientHeight;
    //   // setIsScrollBottom(true);
    //   return;
    // }

    // setIsScrollBottom(scrollHeight - clientHeight - scrollTop <= 56 * 3);
    if (scrollHeight - clientHeight - scrollTop > 56 * 3) return;

    listElement.current.scrollTop = scrollHeight - clientHeight;
  }, [info?.messages?.length]);

  // useEffect(() => {
  //   if (!listElement.current) return;

  //   const { scrollHeight, scrollTop, clientHeight } = listElement.current;

  //   console.log('boom!');
  //   listElement.current.scrollTo({ top: 99999 });
  //   // setIsScrollBottom(true);
  // }, [info?.roomId]);

  return (
    <div
      css={[
        tw`relative w-full h-full flex flex-col justify-end`,
        abled ? tw`bg-slate-300` : tw`bg-slate-100`,
      ]}
      onFocus={() => {
        console.log('focused!');
      }}
      tabIndex={-1}
    >
      <MessageList messages={info?.messages} scrollRef={listElement} />

      {abled ? (
        <form css={[tw`flex h-12`]} onSubmit={handleSubmit(handleSend)}>
          <Input
            css={[tw`h-full`, tw`border-none rounded-none`]}
            {...register('text')}
            disabled={!abled}
          />
          {isDirty && !errors.text ? (
            <Button
              kind="submit"
              css={[
                tw`w-28 h-full flex justify-center items-center`,
                tw`rounded-none`,
                tw`text-white text-3xl font-normal`,
              ]}
            >
              ✉
            </Button>
          ) : null}
        </form>
      ) : null}

      {/* {!isScrollBottom && <div css={[tw`absolute bottom-14`]}>asdas</div>} */}
    </div>
  );
}

export default ChatRoom;
