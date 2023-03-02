import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import React from 'react';
import tw from 'twin.macro';

import RoomListItem from '@components/atoms/chat/Room/RoomListItem';
import AuthContainer from '@components/layout/Container/AuthContainer';
import ChatRoom from '@components/organisms/chat/ChatRoom';
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
    console.log(response.messages);
    setMessages(response.messages);
  }, []);

  const onReceive = useCallback(
    (response: ReceiveResponse) => {
      const {
        message: {
          text,
          createAt,
          room: { id: roomId },
          user: sender,
        },
        unReadCounts,
      } = response;

      setMessages((prevMessages) =>
        prevMessages?.concat({ text, createAt, user: sender }),
      );

      setMessageNotices((prevNotices) => {
        return {
          ...prevNotices,
          [roomId]: {
            unReadCount: unReadCounts[user?.id || 0] || 0,
            text,
            createAt,
          },
        };
      });
    },
    [user?.id],
  );

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
  });

  const onSubmit = useCallback(
    (text: string) => {
      sendMessage({ text, roomId: selectedRoomId || 0 });
    },
    [sendMessage, selectedRoomId],
  );

  return (
    <AuthContainer>
      {/* <RoomList /> */}
      <section className="w-4/6 max-h-[680px] flex shadow-md">
        <ul
          css={[
            tw`w-[250px] max-h-full flex flex-col overflow-y-auto`,
            tw`border border-b-0`,
          ]}
        >
          {subscribeRooms
            ? subscribeRooms.map((room) => {
                const _receiveCount =
                  messageNotices[room.id]?.unReadCount ??
                  room.unReadCounts[user?.id || 0];

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
        <article css={[tw`flex-1`, tw`border border-l-0`]}>
          <ChatRoom
            info={{ messages, roomId: selectedRoomId }}
            onSend={onSubmit}
          />
        </article>
      </section>
    </AuthContainer>
  );
};

export default MyRoomsPage;
