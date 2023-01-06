import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AuthApi } from '../../../lib/api/auth';
import useUser from '../../../lib/hooks/useUser';
import Button from '../../atoms/form/Button/Button';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import styles from './Header.module.css';
import Avatar from '../../atoms/profile/Avatar/Avatar';

function Header() {
  const router = useRouter();
  const { isLogin, user, isLoading } = useUser();

  const handleClickRegister = useCallback(
    () => router.push('/auth/register'),
    [router],
  );

  const handleClickLogin = useCallback(
    () => router.push('/auth/login'),
    [router],
  );

  const handleClickUpdateProfile = useCallback(
    () => router.push('/profile/update'),
    [router],
  );

  const handleClickChangePassword = useCallback(
    () => router.push('/profile/change-password'),
    [router],
  );

  const handleClickLogout = useCallback(() => {
    AuthApi.logout().then(() => router.reload());
  }, [router]);

  return (
    <header className={styles.container}>
      {isLogin && !isLoading ? (
        <div className={styles.profile}>
          <Menu
            menuButton={
              <Avatar photoSrc={user?.photo} username={user?.username} />
            }
            transition
          >
            <MenuItem onClick={handleClickUpdateProfile}>프로필 수정</MenuItem>
            {user?.provider === 'local' && (
              <MenuItem onClick={handleClickChangePassword}>
                비밀번호 변경
              </MenuItem>
            )}
            <MenuItem>설정?</MenuItem>
          </Menu>
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
