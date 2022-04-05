import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { parseCookies } from '../lib/cookiehelper'
import styles from '../styles/Home.module.css'

export default function Home(ck) {
  const router = useRouter()
  useEffect(() => {
    if (ck == !undefined) {
      console.log(ck)
      router.push({
        pathname: `/console/${ck.ck.token}`
      })
    }
  }, [])

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

Home.getInitialProps = async ({ req, res }) => {
  const ck = parseCookies(req)
  console.log(ck)//DEBUG log
  if (ck) {
    return {
      ck
    }
  }
}
