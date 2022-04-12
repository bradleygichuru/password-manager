import React, { useEffect, useState } from 'react'
import { parseCookies } from '../../lib/cookiehelper';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Console.module.css'
//import useSWR from 'swr'
import { useRouter } from 'next/router';
import Password from '../../components/Password';
import react from 'react';
import Loader from '../../components/Loader'

//const fetcher = (...args) => fetch(...args).then((res) => res.json())

//TODO make add password form look better 
class Console extends React.Component {

    // console.log(ck.ck)
    constructor(props) {
        super(props)

        this.state = { passwordList: [], noPasswordList: '', loading: false }
    }

    componentDidMount() {
        this.constructPasswords()
        console.log("mounted")//DEBUG log


    }
    componentDidUpdate() {
        console.log('update')//DEBUG log
        

        //this.populate()
    }

    static async getInitialProps(ctx) {
        const ck = parseCookies(ctx.req)
        console.log({ ck })
        if (ck) {
            return {
                ck: ck
            }
        }
    }

    refresh = () => {
        this.setState({ data: {}, passwords: [], passwordList: [] })
    }

    addPswd = (event) => {
        // handle adding of passwords 
        event.preventDefault()
        //TODO give user feedback that their password has been added or give user feedback when he has been signed in 
        this.setState({loading:!this.state.loading})
        fetch(
            '/api/v1/pswdManip/add',
            {
                body: JSON.stringify({
                    password: event.target.password.value,
                    username: event.target.username.value,
                    siteurl: event.target.siteurl.value,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        ).then((res) => res.json()).then((data) => {
            //this.refresh()
            console.log(data)//DEBUG log


            this.setState({
                passwordList: data.payload.map((password, index) => {
                    //console.log(password)
                    return <Password key={index} site={password.site} password={password.password} username={password.username} refresh={this.constructPasswords}></Password>
                })
            })
            this.setState({loading:!this.state.loading})



        })
        // this.constructPasswords()



    }


    constructPasswords = () => {
        this.setState({loading:!this.state.loading})
        fetch(`/api/v1/${this.props.ck.token}`).then((res) => res.json()).then((data) => {
            console.log(data)
            if (data.payload.length > 0) {
                this.setState({
                    passwordList: data.payload.map((password, index) => {
                        //console.log(password)
                        return <Password key={index} site={password.site} password={password.password} username={password.username} refresh={this.constructPasswords}></Password>
                    })
                })
                this.setState({loading:!this.state.loading})
            }
            else if (data.payload.length == 0) {
                this.setState({ noPasswordList: 'you have no password entries' })
            }

        })
       


    }

    render() {
        let loading = this.state.loading
        if (loading == true) {
            return (
                <div>
                    <Loader name='You are being registered'></Loader>

                </div>
            )
        }
        else {


            return (
                <div>
                    <Navbar></Navbar>
                    <div className={styles.pageContainer}>
                        <div className={styles.container}>
                            <form onSubmit={this.addPswd} id={styles.contact} method="post">
                                <h3>Add password</h3>

                                <input
                                    placeholder="Site url"
                                    type="text"
                                    tabindex="1"
                                    name="siteurl"
                                    required
                                    autofocus
                                />

                                <input
                                    placeholder="Site username"
                                    name="username"
                                    type="text"
                                    tabindex="2"
                                    required
                                />

                                <input
                                    placeholder="Site password "
                                    name="password"
                                    type="password"
                                    tabindex="2"
                                    required
                                />

                                <input
                                    id={styles.contactSubmit}
                                    align="center"
                                    text="submit"
                                    value="Submit"
                                    type="submit"

                                />
                            </form>
                        </div>

                        <div id={styles.passwordsContainer}>
                            {
                                this.state.passwordList.length > 0 ? this.state.passwordList : <p className={styles.pswdEntriesPrompt}>{this.state.noPasswordList}</p>
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default Console;