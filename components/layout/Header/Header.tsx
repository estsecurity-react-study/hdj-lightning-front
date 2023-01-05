import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AuthApi } from '../../../lib/api/auth';
import useUser from '../../../lib/hooks/useUser';
import Button from '../../atoms/form/Button/Button';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import ProfileSvg from '../../../public/asset/svg/profile.svg';
import styles from './Header.module.css';

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

  const handleClickLogout = useCallback(() => {
    AuthApi.logout().then(() => router.reload());
  }, [router]);

  return (
    <header className={styles.container}>
      {isLogin && !isLoading ? (
        <div className={styles.profile}>
          <Menu
            menuButton={
              <article className={styles.profileImage}>
                <Image
                  src={user?.photo || ''}
                  alt={`${user?.username}'s profile Image`}
                  fill
                />
              </article>
            }
            transition
          >
            <MenuItem onClick={handleClickUpdateProfile}>프로필 설정</MenuItem>
            <MenuItem>설정?</MenuItem>
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
