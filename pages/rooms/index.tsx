import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { io } from 'socket.io-client';
import AuthContainer from '../../components/layout/Container/AuthContainer';

const socket = io('http://localhost:3001/chat', {
  transports: ['websocket'],
});

interface Chat {
  text: string;
  isMe: boolean;
  time: Date;
}

interface Message {
  text: string;
  sender: string;
  time: Date;
}

const RoomsPage: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<{ text: string }>();
  const [chatStack, setChatStack] = useState<Chat[]>([]);

  const pushChat = useCallback((message: Message) => {
    const { text, sender, time } = message;
    setChatStack((prevStack) =>
      prevStack.concat({ text, isMe: sender === socket.id, time }),
    );
  }, []);

  const onSubmit: SubmitHandler<{ text: string }> = useCallback((data) => {
    console.log(data);
    socket.emit('clientSend', data);
    reset();
  }, []);

  useEffect(() => {
    socket.on('serverSend', pushChat);

    return () => {
      socket.off('serverSend', pushChat);
    };
  }, []);

  return (
    <AuthContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: '300px',
          height: '500px',
          border: '1px solid black',
          marginRight: '1rem',
          overflow: 'hidden',
        }}
      >
        {chatStack.map(({ text, isMe }) => (
          <div
            style={{
              width: '100%',
              padding: '.5rem',
              paddingBottom: '.2rem',
              borderBottom: '1px solid gray',
              textAlign: isMe ? 'right' : 'left',
            }}
          >
            {text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('text')} />

        <button type="submit">Submit</button>
      </form>
    </AuthContainer>
  );
};

export default RoomsPage;
