// import '@/styles/globals.css'
import '../public/Assests/js/main'

import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <Script src="./Assests/js/script.js"/> */}
      <Component {...pageProps} />
    </>
  )
}
