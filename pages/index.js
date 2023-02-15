import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react'
import AOS from "aos";
import Header from './Components/Header';
import Hero from './Components/Hero';
import About from './Components/About';
import Facts from './Components/Fact';
import Skills from './Components/Skills';
import Services from './Components/Services';
import Testimonials from './Components/Testimonials';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

export default function Home() {
  useEffect(() => {
    AOS.init({
      offset: 10
    })
  })
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />

        <title>Savan Padaliya | Full Stack Blockchain Developer</title>
        <meta content="Full-stack blockchain developer with a passion for building decentralized applications. My extensive experience in JavaScript, NodeJS, React, Angular, and MongoDB has provided me with a robust set of skills that allows me to develop and deploy a wide range of applications." name="description" />
        <meta content="Full stack blockchain developer, blockchain developer, javascript developer, MEAN stack developer, MERN stack developer, Nodejs Developer, Solidity Developer" name="keywords" />

        {/* <!-- Favicons --> */}
        <link href="/assets/img/favicon.png" rel="icon" />
        <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

        {/* <!-- Google Fonts --> */}
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" />

        {/* <!-- Vendor CSS Files --> */}
        <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
        <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
        <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
        <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />
        <link href="/assets/vendor/swiper/swiper-bundle.min.js" rel="stylesheet" />

        {/* <!-- Template Main CSS File --> */}
        <link href="/assets/css/style.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/js/swiper.min.js" async></script>


      </Head>
      {/* asd */}
      {/* ======= Mobile nav toggle button ======= */}
      {/* <button type="button" className="mobile-nav-toggle d-xl-none"><i className="bi bi-list mobile-nav-toggle"></i></button> */}
      <i className="bi bi-list mobile-nav-toggle d-lg-none"></i>
      <Header />
      <Hero />
      <main id="main">
        <About />
        <Facts />
        <Skills />
        <Services />
        {/* <Testimonials /> */}
        <Contact />
      </main>{/* End #main */}
      <Footer />
      {/* <div id="preloader"></div> */}
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
      {/* Vendor JS Files */}
      <Script src="/assets/vendor/purecounter/purecounter_vanilla.js"></Script>
      <Script src="/assets/vendor/aos/aos.js"></Script>
      <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>
      <Script src="/assets/vendor/glightbox/js/glightbox.min.js"></Script>
      <Script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"></Script>
      <Script src="/assets/vendor/swiper/swiper-bundle.min.js"></Script>
      <Script src="/assets/vendor/typed.js/typed.min.js"></Script>
      <Script src="/assets/vendor/waypoints/noframework.waypoints.js"></Script>
      <Script src="/assets/vendor/php-email-form/validate.js"></Script>

      {/* Template Main JS File */}
      <Script src="/assets/js/main.js"></Script>


    </>
  )
}
