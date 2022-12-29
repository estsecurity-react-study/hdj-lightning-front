import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AuthApi } from '../../../lib/api/auth';
import useUser from '../../../lib/hooks/useUser';
import Button from '../../atoms/form/Button/Button';
import styles from './Header.module.css';

function Header() {
  const router = useRouter();
  const { isLogin, mutate, user } = useUser();

  const handleClickRegister = useCallback(
    () => router.push('/auth/register'),
    [router],
  );

  const handleClickLogin = useCallback(
    () => router.push('/auth/login'),
    [router],
  );

  const handleClickLogout = useCallback(() => {
    mutate(null).then(() => {
      AuthApi.logout();
      window.localStorage.setItem('logout', `${Date.now()}`);
    });
  }, [mutate]);

  return (
    <header className={styles.container}>
      {isLogin ? (
        <div className={styles.profile}>
          <article className={styles.tempCircle} />
          <div>
            <Button kind="ghost" onClick={handleClickLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.profile}>
          <div>
            <Button kind="submit" onClick={handleClickLogin}>
              로그인
            </Button>
          </div>
          <div>
            <Button kind="primary" onClick={handleClickRegister}>
              회원가입
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
