import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import tw from 'twin.macro';

import AuthContainer from '@components/layout/Container/AuthContainer';
import ChatRoom from '@components/organisms/chat/ChatRoom';
import useChats, {
  FetchResponse,
  Message,
  ReceiveResponse,
} from '@lib/hooks/useChats';

const RoomsPage: NextPage = () => {
  const {
    query: { roomId },
  } = useRouter();
  const [messages, setMessages] = useState<Message[]>();

  const _roomId = useMemo(() => {
    const numberId = Number(roomId);
    return Number.isNaN(numberId) ? undefined : numberId;
  }, [roomId]);

  const onFetch = useCallback((res: FetchResponse) => {
    console.log(res);
    setMessages(res.messages);
  }, []);

  const onReceive = useCallback((res: ReceiveResponse) => {
    console.log(res.message);
    setMessages((prevMessages) => prevMessages?.concat(res.message));
  }, []);

  const { sendMessage, fetch } = useChats({ onReceive, onFetch });

  const onSend = useCallback(
    (text: string) => {
      sendMessage({ text, roomId: _roomId });
    },
    [sendMessage, _roomId],
  );

  useEffect(() => {
    if (messages) return;
    fetch(_roomId);
  }, [fetch, _roomId, messages]);

  return (
    <AuthContainer>
      <div css={[tw`w-96 h-full max-h-[640px]`, tw`shadow-md`]}>
        <ChatRoom info={{ messages, roomId: _roomId }} onSend={onSend} />
      </div>
    </AuthContainer>
  );
};

export default RoomsPage;
