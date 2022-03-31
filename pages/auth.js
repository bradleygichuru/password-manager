import Navbar from "../components/Navbar";
import styles from '../styles/Auth.module.css'
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"
import { parseCookies } from "../lib/cookiehelper";

function Auth(ck) {
    const [cookie, setCookie] = useCookies(["token"])
    const router = useRouter();
    if (ck == !undefined) {
        router.push({
            pathname: `/console/${ck.ck.token}`
        })
    }

    //TODO ensure user exists or is created before proceeding to the console page 
    const handleAuth = async event => {
        // handle user authentication
        event.preventDefault()

        const res = await fetch(
            '/api/authhandler',
            {
                body: JSON.stringify({
                    password: event.target.password.value,
                    username: event.target.username.value

                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
        const result = await res.json();
        console.log(result.user)
        if (result.existence) {
            setCookie('token', result.user.token, {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })
            console.log(cookie)
            router.push({
                pathname: `/console/${result.user.token}`

            })
            //TODO make logic to handle user non-existence 
        }
        if (!result.existence && !ck) {
            setCookie('token', result.user.token, {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })
            console.log(cookie)
            router.push({
                pathname: `/console/${result.user.token}`,
                query: result.user.token
            })
        }
    }//TODO implement loading screen as user waits for authentication 
    return (
        <div>
            <Navbar />
            <div className={styles.main}>
                <p className={styles.sign} align="center">Sign in or Login</p>
                <form onSubmit={handleAuth} className={styles.form1} method="post">
                    <input className={styles.un} type="text" align="center" placeholder="username" name="username" />
                    <input className={styles.pass} type="password" align="center" placeholder="Password" name="password" />
                    <input className={styles.submit} align="center" text='submit' value="Submit" type="submit" />
                </form>
            </div>

        </div>
    )
}
Auth.getInitialProps = async ({ req, res }) => {
    const ck = parseCookies(req)
    console.log({ ck })
    if (ck) {
        return {
            ck: ck
        }
    }
}
export default Auth;