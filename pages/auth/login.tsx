import { NextPage } from 'next';
import LightningLogo from '../../public/asset/svg/lightning-icon.svg';
import LoginForm from '../../components/organisms/form/LoginForm';

import styles from '../../styles/Auth.module.css';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const LoginPage: NextPage = () => {
  const router = useRouter();

  const handleClickLogo = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
        <article onDoubleClick={handleClickLogo}>
          <LightningLogo className={styles.art} />
        </article>
      </div>
    </div>
  );
};

export default LoginPage;
