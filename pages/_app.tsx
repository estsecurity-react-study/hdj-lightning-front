import '../styles/globals.css';
import type { AppProps } from 'next/app';
import LocalFont from '@next/font/local';
import { SWRConfig } from 'swr';
import { fetcher } from '../lib/api';
import Layout from '../components/layout/Layout';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const NanumNeo = LocalFont({
  src: '../public/asset/font/Nanum/NanumSquareNeo-Variable.woff',
  variable: '--nanum-font',
});

export default function App({ Component, pageProps }: AppProps) {
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
