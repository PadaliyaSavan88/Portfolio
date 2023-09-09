import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import Hero from '@/components/Index/hero'
import AboutUs from '@/components/Index/aboutUs'
import WhatWeDo from '@/components/Index/whatWeDo'
import OurBlogs from '@/components/Index/ourBlogs'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="Assests/Css/bootstarp.css" />

                <title>The Blockchain Insider</title>
            </Head>
            <Header />
            <div className='web-body'>
                <Hero />

                <div className="container-fluid w-75">
                    <AboutUs />
                    <WhatWeDo />
                    <OurBlogs />
                </div>
                <Footer />
            </div>
        </>
    )
}
