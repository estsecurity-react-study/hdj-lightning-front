import { useRouter } from 'next/router';
import { PropsWithChildren, useCallback } from 'react';
import useUser from '../../../lib/hooks/useUser';
import Button from '../../atoms/form/Button/Button';
import AuthGuard from '../../organisms/guards/AuthGuard';
import LoadingGuard from '../../organisms/guards/LoadingGuard';
import styles from './Container.module.css';

function AuthContainer({ children }: PropsWithChildren) {
  const { isLoading, isLogin } = useUser();

  const renderGuard = useCallback(() => {
    if (isLoading) return <LoadingGuard />;
    if (!isLogin) return <AuthGuard />;

    return null;
  }, [isLoading, isLogin]);

  return <div className={styles.container}>{renderGuard() || children}</div>;
}

export default AuthContainer;
