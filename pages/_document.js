import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <Script async src='/Assests/js/main.js' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
