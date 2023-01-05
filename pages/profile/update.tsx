import { NextPage } from 'next';
import { UserProfile } from '../../@types/api/response';

import AuthContainer from '../../components/layout/Container/AuthContainer';
import ProfileForm from '../../components/organisms/form/ProfileForm/ProfileForm';
import useUser from '../../lib/hooks/useUser';

const UpdateProflePage: NextPage = () => {
  return (
    <AuthContainer>
      <ProfileForm />
    </AuthContainer>
  );
};

export default UpdateProflePage;
