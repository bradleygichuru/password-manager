import Navbar from "../components/Navbar";
import styles from '../styles/Auth.module.css'
import { withRouter } from 'next/router'
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { parseCookies } from "../lib/cookiehelper";
import React from "react";
import Loader from "../components/Loader";

class Auth extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        console.log(this.props.ck)
        this.state = { isFetchingData: false, isBeingLoggedin: false, isBeingRegistered: false }

    }

    setTokenCookie = (content) => {
        const { cookies } = this.props;

        cookies.set("token", content, {
            path: "/",
            maxAge: 3600,
            sameSite: true,
        })
    }
    promptLogin = () => {
        this.setState({ isFetchingData: false })
        this.setState({ isBeingLoggedin: true })
    }
    prompReg = () => {
        this.setState({ isFetchingData: false })
        this.setState({ isBeingRegistered: true })
    }
    handleAuth = async (event) => {
        // handle user authentication
        event.preventDefault();
        this.setState({ isFetchingData: true })
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
        );
        const result = await res.json();

        console.log(result.existence);
        if (result.existence == true) {

            this.promptLogin()
            this.setTokenCookie(result.token)
            this.props.router.push({
                pathname: `/console/${result.token}`
            });

        }
        if (result.existence == false) {
            this.prompReg()
            this.setTokenCookie(result.token)
            this.props.router.push({
                pathname: `/console/${result.token}`
            });

        }
        //TODO find a way to tell the user they are being registered
    }//TODO make loading screen work as it should 
    render() {
        let logInStatus = this.state.isBeingLoggedin;
        let regStatus = this.state.isBeingRegistered;
        let isFetchingData = this.state.isFetchingData;

        if (logInStatus) {
            return (

                <div>
                    <Loader name='logging you in'></Loader>

                </div>
            )
        }
        if (regStatus) {
            return (
                <div>
                    <Loader name='You are being registered'></Loader>

                </div>
            )
        }
        if (isFetchingData) {
            return (
                <div>
                    <Loader name='Fetching data'></Loader>

                </div>
            )
        }
        return (
            <div>
                <Navbar />
                <div className={styles.main}>
                    <p className={styles.sign} align="center">Sign in or Login</p>
                    <form onSubmit={this.handleAuth} className={styles.form1} method="post">
                        <input className={styles.un} type="text" align="center" placeholder="username" name="username" />
                        <input className={styles.pass} type="password" align="center" placeholder="Password" name="password" />
                        <input className={styles.submit} align="center" text='submit' value="Submit" type="submit" />
                    </form>
                </div>

            </div>
        )
    }

}

export default withRouter(withCookies(Auth));