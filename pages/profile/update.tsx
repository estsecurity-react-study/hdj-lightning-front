import { NextPage } from 'next';

import AuthContainer from '../../components/layout/Container/AuthContainer';
import ProfileForm from '../../components/organisms/form/ProfileForm/ProfileForm';

const UpdateProflePage: NextPage = () => {
  return (
    <AuthContainer>
      <ProfileForm />
    </AuthContainer>
  );
};

export default UpdateProflePage;
