// import '@/styles/globals.css'
// import '../public/Assests/js/main'

import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="robots" content="all" /></Head>
      {/* <Script src="./Assests/js/script.js"/> */}
      <Script async strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-N3GKFN94TH"></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments) }
          gtag('js', new Date());
          
          gtag('config', 'G-N3GKFN94TH');
        `}
      </Script>
      <link rel="stylesheet" href="/Assests/Css/bootstarp.css" />

      <Component {...pageProps} />
    </>
  )
}
