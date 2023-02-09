import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import LoginForm from '@components/organisms/form/LoginForm';
import LightningLogo from '@public/asset/svg/lightning-icon.svg';

import styles from '../../styles/Auth.module.css';

const LoginPage: NextPage = () => {
  const router = useRouter();

  const handleClickLogo = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm redirectSuccessUrl={(router.query.goal as string) || ''} />
        <article onDoubleClick={handleClickLogo}>
          <LightningLogo className={styles.art} />
        </article>
      </div>
    </div>
  );
};

export default LoginPage;
