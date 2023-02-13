import { useCallback, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { UserProfile } from '~types/api/response';

interface Room {
  id: number;
  name: string;
  users: UserProfile[];
  unReadCount: number;
}

export interface Message {
  text: string;
  user: Pick<UserProfile, 'id' | 'username' | 'photo'>;
  createAt: string;
}

interface ReceiveMessage extends Message {
  id: number;
  room: Room;
}

interface CreateRoomRequest {
  name: string;
  userIds: number[];
}

interface MessageRequest {
  text: string;
  roomId: number;
}

export interface FetchResponse {
  unReadCount: number;
  messages: Message[];
}

export interface ReceiveResponse {
  unReadCount: number;
  message: ReceiveMessage;
}

interface Options {
  onReload?: (roomId: number) => void;
  onFetch?: (response: FetchResponse) => void;
  onReceive?: (response: ReceiveResponse) => void;
  onSend?: (message: ReceiveResponse) => void;
  onInvite?: (room: Room) => void;
}

interface NamespaceSpecificClientToServerEvents {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clientSend: (message: MessageRequest, ...args: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetch: (fetchInfo: { roomId: number }, ...args: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe: (...args: any[]) => void;
  createRoom: (roomInfo: CreateRoomRequest) => void;
}

interface NamespaceSpecificServerToClientEvents {
  serverSend: (response: ReceiveResponse) => void;
  reload: (roomId: number) => void;
  invite: (room: Room) => void;
}

const socket: Socket<
  NamespaceSpecificServerToClientEvents,
  NamespaceSpecificClientToServerEvents
> = io(process.env.NEXT_PUBLIC_CHAT_URI || '', {
  transports: ['websocket'],
});

const useChats = ({
  onReload,
  onReceive,
  onSend,
  onFetch,
  onInvite,
}: Options) => {
  const [subscribeRooms, setSubscribeRooms] = useState<Room[]>();

  const createRoom = useCallback((roomInfo: CreateRoomRequest) => {
    socket.emit('createRoom', roomInfo);
  }, []);

  // 메세지 전송
  const sendMessage = useCallback(
    ({ text, roomId }: MessageRequest) => {
      socket.emit(
        'clientSend',
        { text, roomId },
        (message: ReceiveResponse) => {
          onSend?.(message);
        },
      );
    },
    [onSend],
  );

  // 메세지 GET
  const fetch = (roomId: number) => {
    // 리시브 카운트 초기화
    // 초기 데이터 가져옴
    socket.emit('fetch', { roomId }, (response: FetchResponse) => {
      onFetch?.(response);
    });
  };

  const handleInvite = useCallback(
    (room: Room) => {
      setSubscribeRooms((prevRooms) => prevRooms?.concat(room));
      onInvite?.(room);
    },
    [onInvite],
  );

  const handleReceive = useCallback(
    ({ message, unReadCount }: ReceiveResponse) => {
      onReceive?.({ message, unReadCount });
    },
    [onReceive],
  );

  const handleReload = useCallback(
    (roomId: number) => {
      onReload?.(roomId);
    },
    [onReload],
  );

  useEffect(() => {
    socket.emit('subscribe', (rooms: Room[]) => {
      console.log('subscribes rooms:', rooms);
      setSubscribeRooms(rooms);
    });
  }, []);

  useEffect(() => {
    socket.on('invite', handleInvite);
    socket.on('serverSend', handleReceive);
    socket.on('reload', handleReload);

    return () => {
      socket.off('invite', handleInvite);
      socket.off('serverSend', handleReceive);
      socket.off('reload', handleReload);
    };
  }, [handleInvite, handleReceive, handleReload]);

  return { subscribeRooms, sendMessage, fetch, createRoom };
};

export default useChats;
