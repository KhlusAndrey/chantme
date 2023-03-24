import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Chantme from '@/components/chantme'
import { NextPage } from 'next'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  return (
    
    <div className={styles.container}>
      <Head>
        <title>Chantme App | AI chant generating</title>
        <meta name="description" content="Generated chants" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <Chantme/>
    </div>
  );
};

export default Home;