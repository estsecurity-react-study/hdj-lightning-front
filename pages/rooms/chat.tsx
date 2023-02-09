import { NextPage } from 'next';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import MessageBox from '@components/atoms/chat/Message/Message';
import AuthContainer from '@components/layout/Container/AuthContainer';
import useChat from '@lib/hooks/useChat';
import useUser from '@lib/hooks/useUser';

const RoomsPage: NextPage = () => {
  const { user } = useUser();
  const { register, handleSubmit, setValue } = useForm<{
    text: string;
  }>();
  const { messages, sendMessage } = useChat({ user });

  const onSubmit: SubmitHandler<{ text: string }> = useCallback(
    ({ text }) => {
      sendMessage(text);
      setValue('text', '');
    },
    [sendMessage, setValue],
  );

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
        {messages.map(({ text, isMe, time }, index) => (
          <div key={`${time}_${index}`}>
            <MessageBox me={isMe}>{text}</MessageBox>
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
