import styles from './password.module.css'
import Image from 'next/image';
import editIcon from '../assets/icons8-pen-64.png'
import deleteIcon from '../assets/icons8-trash-30.png'
import React from 'react';
class Password extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editSite: false,
            editPassword: false,
            editUsername: false,
            
        }
    }
    deletePswd = async event => {
        event.preventDefault()
        //TODO handle  editing and copying to clipboard of passwords
        const res = await fetch(
            '/api/v1/pswdManip/delete',
            {
                body: JSON.stringify({
                   
                    candidate: this.props.site,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
        const result = await res.json();
        console.log(result)//
       this.props.refresh()

    }

    editUsernameField = async (event) => {
        event.preventDefault();
        this.setState({editUsername:!this.state.editUsername})


    }
    editPasswordField = async (event) => {
        event.preventDefault();
        this.setState({editPassword:!this.state.editPassword})


    }
    editSiteField = async (event) => {
        event.preventDefault();
        this.setState({editSite:!this.state.editSite})


    }

    render() {
        /*const editPassword = this.state.editPassword
        const editSite = this.state.editSite
        const editUsername = this.state.editUsername*/
        return (
            //TODO add save button in each field to update the password once editing is done 
            <div className={styles.password}>

                <p className={styles.itemInformation}>Item Information</p>


                <div className={styles.field}>
                    {
                        this.state.editSite == true ? <input className={styles.site_input} placeholder={this.props.site}></input> : <p className={styles.passSite}>{this.props.site}</p>

                    }
                    <Image

                        src={editIcon}
                        alt="edit icon"
                        width={20}

                        height={20}
                        className={styles.actionButton}
                        onClick={this.editSiteField}

                    />
                </div>
                <div className={styles.field}>
                    {
                        this.state.editPassword == true ? <input className={styles.password_input} placeholder={this.props.password}></input> : <p className={styles.passText}>{this.props.password}</p>

                    }

                    <Image

                        src={editIcon}
                        alt="edit icon"
                        width={20}
                        height={20}
                        className={styles.actionButton}
                        onClick={this.editPasswordField}

                    />
                </div>
                <div className={styles.field}>
                    {
                        this.state.editUsername == true ? <input className={styles.username_input} placeholder={this.props.username}></input> : <p className={styles.passUsername}>{this.props.username}</p>
                    }

                    <Image

                        src={editIcon}
                        alt="edit icon"
                        width={20}
                        height={20}
                        className={styles.actionButton}
                        onClick={this.editUsername}

                    />

                </div>

                <Image
                    width={20}
                    height={20}
                    src={deleteIcon}
                    alt="delete icon"
                    className={styles.actionButton}
                    onClick={this.deletePswd}

                />
            </div>
        )
    }
}
export default Password;