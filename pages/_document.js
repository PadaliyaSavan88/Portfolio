import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="stylesheet" href="Assests/Css/bootstarp.css" />
      </Head>
      <body>
        <Main />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-N3GKFN94TH"></Script>
        <Script async src='/Assets/js/googleAnalytics.js' />
        <NextScript />
      </body>
    </Html>
  )
}
