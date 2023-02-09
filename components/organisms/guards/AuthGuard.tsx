import { useRouter } from 'next/router';
import { useCallback } from 'react';

import Button from '@components/atoms/form/Button/Button';

import styles from './Guard.module.css';

function AuthGuard() {
  const router = useRouter();

  const handleClickLogin = useCallback(() => {
    router.push(`/auth/login?goal=${router.pathname}`);
  }, [router]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>로그인이 필요합니다.</h3>
      <Button onClick={handleClickLogin}>로그인 하러가기</Button>

      <section className={`${styles.cloudWrapper}`}>
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
      </section>

      <section className={`${styles.cloudWrapper} ${styles.after}`}>
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
        <div className={styles.cloud} />
      </section>
    </div>
  );
}

export default AuthGuard;
