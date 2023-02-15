import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import tw from 'twin.macro';

import Message from '@components/atoms/chat/Message/Message';
import RoomListItem from '@components/atoms/chat/Room/RoomListItem';
import Button from '@components/atoms/form/Button/Button';
import Input from '@components/atoms/form/Input/Input';
import AuthContainer from '@components/layout/Container/AuthContainer';
import useChats, {
  FetchResponse,
  Message as IMessage,
  ReceiveResponse,
} from '@lib/hooks/useChats';
import useUser from '@lib/hooks/useUser';

interface PreviewMessage {
  unReadCount: number;
  text: string;
  createAt: string;
}

interface PreviewMessages {
  [roomId: number]: PreviewMessage;
}

const MyRoomsPage: NextPage = () => {
  const { user } = useUser();
  const { register, handleSubmit } = useForm<{ text: string }>();
  const [messageNotices, setMessageNotices] = useState<PreviewMessages>({
    0: {
      unReadCount: 0,
      text: '',
      createAt: '',
    },
  });
  const [messages, setMessages] = useState<IMessage[]>();
  const [selectedRoomId, setSelectedRoomId] = useState<number>();

  const onFetch = useCallback((response: FetchResponse) => {
    setMessages(response.messages);
  }, []);

  const onReceive = useCallback((response: ReceiveResponse) => {
    const {
      message: {
        text,
        createAt,
        room: { id: roomId },
        user,
      },
      unReadCount,
    } = response;

    setMessages((prevMessages) =>
      prevMessages?.concat({ text, createAt, user }),
    );

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

  const onSubmit: SubmitHandler<{ text: string }> = useCallback(
    ({ text }) => {
      sendMessage({ text, roomId: selectedRoomId || 0 });
    },
    [sendMessage, selectedRoomId],
  );

  return (
    <AuthContainer>
      {/* <RoomList /> */}
      <section className="w-4/6 max-h-[680px] flex shadow-md">
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
                      setSelectedRoomId(room.id);
                      console.log(room.id);
                    }}
                  />
                );
              })
            : 'loading...'}
        </ul>
        <article css={[tw`flex-1 bg-slate-50`, tw`border border-l-0`]}>
          <div className="w-full h-full flex flex-col justify-end">
            <ul
              css={[
                tw`w-full h-full overflow-auto`,
                tw`flex-1 flex flex-col`,
                tw`mr-4`,
              ]}
            >
              {messages?.map(({ user: _user, text, createAt }) => {
                return (
                  <div key={`${createAt}_${_user.id}`} css={tw`mb-2`}>
                    <Message me={_user.id === user?.id}>{text}</Message>
                  </div>
                );
              })}
            </ul>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input css={[tw`h-14`, tw`border-none`]} {...register('text')} />
            </form>
          </div>
        </article>
      </section>
    </AuthContainer>
  );
};

export default MyRoomsPage;
