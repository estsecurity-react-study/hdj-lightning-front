import Head from 'next/head';
import styles from '../styles/Home.module.css';
import LightningLogo from '../public/asset/svg/lightning-icon.svg';
import ProfileSvg from '../public/asset/svg/profile.svg';

import { useCallback } from 'react';
import Button from '../components/atoms/form/Button/Button';
import { useRouter } from 'next/router';
import useUser from '../lib/hooks/useUser';
import { motion } from 'framer-motion';
import { variants } from '../lib/helpers/variants';

const containerVariants = variants({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.3 } },
});

const itemVariants = variants({
  hidden: { opacity: 0 },
  show: { opacity: 1 },
});

const logoVariants = variants({
  float: {
    y: [0, -3, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },
});

export default function Home() {
  const { isLogin } = useUser();
  const router = useRouter();

  const handleClickCTA = useCallback(() => {
    if (!isLogin) {
      // TODO: 로그인 완료 후에 모임 만드는 페이지로 한번 더 리다이렉트
      router.push('/auth/login');
      return;
    }

    // next
    console.log('make Room!');
  }, [router, isLogin]);

  return (
    <>
      <Head>
        <title>Lightning</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <section className={styles.section}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h3
              variants={itemVariants}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.5 }}
              className={styles.title}
            >
              <p className={styles.highlight}>번개</p>
              처럼 빠르게 인연을 만들어드려요.
            </motion.h3>

            <motion.p variants={itemVariants} className={styles.content}>
              본인이 원하는 주제로 모임을 만들고 머시갱이 하고 1도 하고 2도하고
              3도하고 ...
            </motion.p>
            <motion.p variants={itemVariants} className={styles.content}>
              본인이 원하는 주제로 모임을 만들고 머시갱이 하고 1도 하고 2도하고
              3도하고 ...
            </motion.p>
            <motion.p variants={itemVariants} className={styles.content}>
              본인이 원하는 주제로 모임을 만들고 머시갱이 하고 1도 하고 2도하고
              3도하고 ...
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className={styles.card}
          >
            <motion.div
              variants={logoVariants}
              animate="float"
              className={styles.logo}
            >
              <LightningLogo />
            </motion.div>

            <div className={styles.ctaButton__wrapper}>
              <Button kind="primary" onClick={handleClickCTA}>
                <span className={styles.ctaButton__content}>
                  모임 만들러 가기!
                </span>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
