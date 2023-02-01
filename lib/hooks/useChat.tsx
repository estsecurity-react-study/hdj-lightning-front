import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { UserProfile } from '../../@types/api/response';

export interface Message {
  text: string;
  senderId: number | string;
  time: Date;
}

type SendMessage = Pick<Message, 'text' | 'senderId'>;

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
  const [messages, setMessages] = useState<Chat[]>([]);

  const receiveMessage = useCallback(
    (message: Message) => {
      const { text, senderId, time } = message;
      setMessages((prevMessages) =>
        prevMessages.concat({
          text,
          isMe: senderId === user?.id,
          time: `${time}`,
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
        senderId: user?.id || '',
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

  return { sendMessage, messages, setMessages };
};

export default useChat;
