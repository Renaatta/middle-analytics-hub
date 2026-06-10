import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head />
      <body>
        <Main />
        {/* ВОТ НАШ ЯКОРЬ ДЛЯ ПОРТАЛОВ */}
        <div id="modal-root"></div>
        <NextScript />
      </body>
    </Html>
  );
}
