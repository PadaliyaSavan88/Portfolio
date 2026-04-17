import { useEffect } from 'react';
import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'
import 'bootstrap/dist/css/bootstrap.css';

const GA_ID = 'G-YBNML3W5EP';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, [])
  return (
    <>
      <Head>
        <meta name="robots" content="all" />
      </Head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}
