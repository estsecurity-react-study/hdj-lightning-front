import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />

      <body className="max-w-[100vw] h-screen overflow-x-hidden bg-[var(--lightning-background-color)]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
