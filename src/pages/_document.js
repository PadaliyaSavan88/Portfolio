import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <Script src='/js/script.js'></Script>
        {/* LLM discovery links for GEO/AEO */}
        <link rel="llms" href="https://www.savanpadaliya.com/llms.txt" />
        <link rel="llms-full" href="https://www.savanpadaliya.com/llms-full.txt" />
        {/* <link ref='stylesheets' src='bootstrap/dist/css/bootstrap.css' /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>

    </Html>
  )
}
