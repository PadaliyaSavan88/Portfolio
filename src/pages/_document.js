import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <Script src='/js/script.js'></Script>
        {/* <link ref='stylesheets' src='bootstrap/dist/css/bootstrap.css' /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>

    </Html>
  )
}
