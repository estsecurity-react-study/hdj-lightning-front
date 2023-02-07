import { NextPage } from 'next';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import MessageBox from '../../components/atoms/chat/Message/Message';
import AuthContainer from '../../components/layout/Container/AuthContainer';
import Card from '../../components/atoms/card/Card';
import useChat from '../../lib/hooks/useChat';
import useUser from '../../lib/hooks/useUser';

const RoomsPage: NextPage = () => {
  const { user } = useUser();

  return (
    <AuthContainer>
      <div>
        <Card>asdasdsa</Card>
        <Card>asdasdsa</Card>
        <Card>asdasdsa</Card>
        <Card>asdasdsa</Card>
        <Card>asdasdsa</Card>
        <Card>asdasdsa</Card>
      </div>
    </AuthContainer>
  );
};

export default RoomsPage;
