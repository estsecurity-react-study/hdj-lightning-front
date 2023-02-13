import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

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
      <div className="min-w-[250px] flex flex-col">
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
          : null}
        {/* {subscribeRooms ? <RoomList rooms={subscribeRooms} /> : null} */}
      </div>
      {/* <form
        onSubmit={handleSubmit(({ text }) =>
          createRoom({ name: text, userIds: [1, 2] }),
        )}
      >
        <Input {...register('text')} />
        <Button kind="submit" />
      </form> */}
      <form
        onSubmit={handleSubmit(({ text }) => sendMessage({ text, roomId: 9 }))}
      >
        <Input {...register('text')} />
        <Button kind="submit" />
      </form>
    </AuthContainer>
  );
};

export default MyRoomsPage;
