import { NextPage } from 'next';

import Card from '@components/atoms/card/Card';
import AuthContainer from '@components/layout/Container/AuthContainer';
import useUser from '@lib/hooks/useUser';

const RoomsPage: NextPage = () => {
  const { user } = useUser();

  return (
    <AuthContainer>
      <div>
        <h3>Show All Public Rooms</h3>
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
