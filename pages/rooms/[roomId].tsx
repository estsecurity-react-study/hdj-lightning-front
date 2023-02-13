import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import MessageBox from '@components/atoms/chat/Message/Message';
import AuthContainer from '@components/layout/Container/AuthContainer';
// import useChat, { Chat } from '@lib/hooks/useChat';
import useUser from '@lib/hooks/useUser';

const RoomsPage: NextPage = () => {
  // const {
  //   query: { roomId },
  // } = useRouter();
  // const { user } = useUser();

  // const { register, handleSubmit, setValue } = useForm<{
  //   text: string;
  // }>();
  // const [messages, setMessages] = useState<Chat[]>([]);

  // const onReceive = useCallback((chat: Chat) => {
  //   setMessages((prevMessages) => prevMessages.concat(chat));
  // }, []);

  // const { prevRoomMessages, sendMessage } = useChat({
  //   mode: 'room',
  //   roomId: Number(roomId || 0),
  //   user,
  //   onReceive,
  // });

  // const onSubmit: SubmitHandler<{ text: string }> = useCallback(
  //   ({ text }) => {
  //     sendMessage(text);
  //     setValue('text', '');
  //   },
  //   [sendMessage, setValue],
  // );

  // useEffect(() => {
  //   setMessages((prevMessages) => {
  //     if (prevMessages.length === 0) {
  //       return prevRoomMessages;
  //     }

  //     return prevMessages;
  //   });
  // }, [prevRoomMessages]);

  return (
    <AuthContainer>
      {/* <div
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
        {messages.map(({ text, isMe, time }, index) => (
          <div key={`${time}_${index}`}>
            <MessageBox me={isMe}>{text}</MessageBox>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('text')} />

        <button type="submit">Submit</button>
      </form> */}
    </AuthContainer>
  );
};

export default RoomsPage;
