import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Headers from './components/header'
import Hero from './components/hero'
import Services from './components/services'
import TechStack from './components/techStack'
import Projects from './components/projects'
import Contact from './components/contact'
import Footer from './components/footer'
import AboutUs from './components/about'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Savan Padaliya | JavaScript Expert | NodeJS, React, Angular | Blockchain Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="title" content="Savan Padaliya | JavaScript Expert | NodeJS, React, Angular | Blockchain Developer" />
        <meta name="description" content="Experienced JavaScript Developer with expertise in NodeJS and blockchain technologies. Specializing in backend and frontend development, deployment, and client-centric solutions for diverse industries." />
        <meta name="keywords" content="JavaScript Developer, NodeJS, React, Angular, Blockchain, Backend Development, Frontend Development, Deployment, Cloud Services, DevOps, Docker, Kubernetes." />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://www.savanpadaliya.com/" />

        <meta property="og:title" content="Savan Padaliya | JavaScript Expert | NodeJS, React, Angular | Blockchain Developer" />
        <meta property="og:site_name" content="Savan Padaliya | Full Stack Blockchain developer" />
        <meta property="og:url" content="https://www.savanpadaliya.com/" />
        <meta property="og:description" content="Experienced JavaScript Developer with expertise in NodeJS and blockchain technologies. Specializing in backend and frontend development, deployment, and client-centric solutions for diverse industries." />
        <meta property="og:image" content="/graphics/header_logo.png" />
      </Head>
      <Headers />
      <Hero />
      <Services />
      <TechStack />
      <Projects />
      <AboutUs />
      {/* <Contact /> */}
      <Footer />
    </>
  )
}
