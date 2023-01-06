import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import AuthContainer from '../../components/layout/Container/AuthContainer';
import PasswordForm from '../../components/organisms/form/PasswordForm/PasswordForm';
import PrePasswordForm from '../../components/organisms/form/PasswordForm/PrePasswordForm';

const ChangePasswordPage: NextPage = () => {
  const [isContinue, setIsContinue] = useState(false);

  const onSuccess = useCallback(() => {
    setIsContinue(true);
  }, [setIsContinue]);

  return (
    <AuthContainer>
      {isContinue ? (
        <PasswordForm />
      ) : (
        <PrePasswordForm onSuccess={onSuccess} />
      )}
    </AuthContainer>
  );
};

export default ChangePasswordPage;
