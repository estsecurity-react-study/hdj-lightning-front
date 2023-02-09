import { useCallback, useEffect, useMemo, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import useSWR from 'swr';

import { UserProfile } from '~types/api/response';

interface Message {
  id: number;
  text: string;
  user: Pick<UserProfile, 'id' | 'username' | 'photo'>;
  createAt: Date;
}

interface SendMessage {
  text: string;
  senderId: number;
}

interface NamespaceSpecificClientToServerEvents {
  clientSend: (message: SendMessage) => void;
}

interface NamespaceSpecificServerToClientEvents {
  serverSend: (message: Message) => void;
}

export interface Chat {
  text: string;
  isMe: boolean;
  time: string;
}

interface UseChatOptions {
  user?: UserProfile;
  onReceive?: (message?: Message) => void;
  onSend?: (message?: string) => void;
}

const socket: Socket<
  NamespaceSpecificServerToClientEvents,
  NamespaceSpecificClientToServerEvents
> = io(process.env.NEXT_PUBLIC_CHAT_URI || '', {
  transports: ['websocket'],
});

const useChat = ({ user, onReceive, onSend }: UseChatOptions) => {
  const { data, isLoading } = useSWR<Message[]>('chat/messages/all');
  const [messages, setMessages] = useState<Chat[]>([]);

  const preMessages: Chat[] = useMemo(() => {
    if (!data) return [];
    console.log('messages!', data);
    return data.map(({ text, createAt, user: { id } }) => ({
      text,
      isMe: user?.id === id,
      time: `${createAt}`,
    }));
  }, [data, user?.id]);

  const receiveMessage = useCallback(
    (message: Message) => {
      const {
        text,
        user: { id },
        createAt,
      } = message;
      setMessages((prevMessages) =>
        prevMessages.concat({
          text,
          isMe: id === user?.id,
          time: `${createAt}`,
        }),
      );
      onReceive?.();
    },
    [user, onReceive],
  );

  const sendMessage = useCallback(
    (messageText: string) => {
      socket.emit('clientSend', {
        text: messageText,
        senderId: user?.id || 0,
      });
      onSend?.(messageText);
    },
    [user?.id, onSend],
  );

  useEffect(() => {
    socket.on('serverSend', receiveMessage);

    return () => {
      socket.off('serverSend', receiveMessage);
    };
  }, [receiveMessage]);

  useEffect(() => {
    setMessages((prevMessages) => preMessages.concat(prevMessages));
  }, [preMessages]);

  return { sendMessage, setMessages, messages, isLoading };
};

export default useChat;
