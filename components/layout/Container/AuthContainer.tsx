import { PropsWithChildren, useCallback } from 'react';

import AuthGuard from '@components/organisms/guards/AuthGuard';
import LoadingGuard from '@components/organisms/guards/LoadingGuard';
import useUser from '@lib/hooks/useUser';

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
