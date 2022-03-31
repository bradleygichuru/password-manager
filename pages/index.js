import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.container}>
        <Head>
          <title>pswm</title>

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.container}>
          <div className={styles.signup}>
            <Link href="/auth" className={styles.signuptext} >first time setup</Link>

          </div>
          <div className={styles.signin}>
            <Link className={styles.signintext} href="/console">authenticate and view passwords</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
