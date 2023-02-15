import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import tw from 'twin.macro';

import RoomListItem from '@components/atoms/chat/Room/RoomListItem';
import Button from '@components/atoms/form/Button/Button';
import Input from '@components/atoms/form/Input/Input';
import AuthContainer from '@components/layout/Container/AuthContainer';
import useChats, {
  FetchResponse,
  Message,
  ReceiveResponse,
} from '@lib/hooks/useChats';

interface PreviewMessage {
  unReadCount: number;
  text: string;
  createAt: string;
}

interface PreviewMessages {
  [roomId: number]: PreviewMessage;
}

const MyRoomsPage: NextPage = () => {
  const { register, handleSubmit } = useForm<{ text: string }>();
  const [messageNotices, setMessageNotices] = useState<PreviewMessages>({
    0: {
      unReadCount: 0,
      text: '',
      createAt: '',
    },
  });
  const [messages, setMessages] = useState<Message[]>();

  const onFetch = useCallback((response: FetchResponse) => {
    setMessages(response.messages);
  }, []);

  const onReceive = useCallback((response: ReceiveResponse) => {
    const {
      message: {
        text,
        createAt,
        room: { id: roomId },
      },
      unReadCount,
    } = response;

    setMessageNotices((prevNotices) => {
      return {
        ...prevNotices,
        [roomId]: {
          unReadCount,
          text,
          createAt,
        },
      };
    });
  }, []);

  const onReload = useCallback((roomId: number) => {
    console.log('reload:', roomId);

    setMessageNotices((prevNotices) => {
      return {
        ...prevNotices,
        [roomId]: { ...prevNotices[roomId], unReadCount: 0 },
      };
    });
  }, []);

  const { subscribeRooms, fetch, sendMessage, createRoom } = useChats({
    onFetch,
    onReceive,
    onReload,
    onSend: (a) => {
      console.log('send:', a);
    },
  });

  return (
    <AuthContainer>
      {/* <RoomList /> */}
      <section className="w-4/6 flex shadow-md">
        <ul className="w-[250px] flex flex-col border border-b-0">
          {subscribeRooms
            ? subscribeRooms.map((room) => {
                const _receiveCount =
                  messageNotices[room.id]?.unReadCount ?? room.unReadCount;

                return (
                  <RoomListItem
                    key={room.id}
                    roomName={room.name}
                    receiveCount={_receiveCount}
                    text={messageNotices[room.id]?.text}
                    onClick={() => {
                      fetch(room.id);
                      console.log(room.id);
                    }}
                  />
                );
              })
            : 'loading...'}
        </ul>
        <article className="flex-1 bg-slate-50 border border-l-0">
          <div className="w-full h-full flex flex-col justify-end">
            <ul className="flex-1">a</ul>
            <Input css={[tw`h-14`, tw`border-none`]} />
          </div>
        </article>
      </section>
      {/* <form
        onSubmit={handleSubmit(({ text }) =>
          createRoom({ name: text, userIds: [1, 2] }),
        )}
      >
        <Input {...register('text')} />
        <Button kind="submit" />
      </form> */}
      {/* <form
        onSubmit={handleSubmit(({ text }) => sendMessage({ text, roomId: 9 }))}
      >
        <Input {...register('text')} />
        <Button kind="submit" />
      </form> */}
    </AuthContainer>
  );
};

export default MyRoomsPage;
