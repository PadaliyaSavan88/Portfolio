import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Hero from '@/components/Index/hero'
import AboutUs from '@/components/Index/aboutUs'
import WhatWeDo from '@/components/Index/whatWeDo'
import OurBlogs from '@/components/Index/ourBlogs'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="Assests/Css/bootstarp.css" />
                <title>The Blockchain Insider - Pioneering Excellence Through Technology and Innovation</title>
                <meta name="description" content="Explore our innovative blockchain solutions, web and mobile app development, AI/ML, data services, and software development. We're your strategic partners in the digital era."></meta>
                <meta name="keywords" content="blockchain solutions, web development, mobile app development, AI/ML, data services, software development, digital transformation"></meta>
            </Head>
            <Header />
            <div className='web-body'>
                <Hero />

                <div className="container-fluid w-75">
                    <AboutUs />
                    <WhatWeDo />
                    {/* <OurBlogs /> */}
                </div>
                <Footer />
            </div>
        </>
    )
}
