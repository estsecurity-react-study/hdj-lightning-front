import '../styles/globals.css';
import type { AppProps } from 'next/app';
import LocalFont from '@next/font/local';

const NanumNeo = LocalFont({
  src: '../asset/Nanum/NanumSquareNeo-Variable.woff',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={NanumNeo.className}>
      <Component {...pageProps} />
    </main>
  );
}
