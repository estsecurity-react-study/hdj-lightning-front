import '../styles/globals.css';
import type { AppProps } from 'next/app';
import LocalFont from '@next/font/local';
import { SWRConfig } from 'swr';
import { fetcher } from '../lib/api';
import Layout from '../components/layout/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NanumNeo = LocalFont({
  src: '../public/asset/font/Nanum/NanumSquareNeo-Variable.woff',
  variable: '--nanum-font',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // TODO: 굳이 필요한..?
    const syncLogout = (event: StorageEvent) => {
      if (event.key === 'logout') {
        console.log('sync logout!');
        router.replace('/auth/login');
      }
    };

    window.addEventListener('storage', syncLogout);

    return () => {
      window.removeEventListener('storage', syncLogout);
    };
  }, []);

  return (
    <SWRConfig value={{ fetcher }}>
      <main className={`${NanumNeo.variable}`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </SWRConfig>
  );
}
