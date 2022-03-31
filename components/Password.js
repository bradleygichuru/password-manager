import styles from './password.module.css'
import Image from 'next/image';
import editIcon from '../assets/icons8-pen-64.png'
import deleteIcon from '../assets/icons8-trash-30.png'
function Password(props) {

    const deletePswd = async event => {
        event.preventDefault()
        //handle deletion of passwords
        const res = await fetch(//FIXME request being sent to wrong url
            '/api/v1/pswdManip/delete',
            {
                body: JSON.stringify({
                    token: props.token,
                    candidate: somevar,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
        const result = await res.json();
        console.log(result)//

    }

    const editField = async event=>{
        event.preventDefault();
    }
    return (
        <div className={styles.password}>
            <p className={styles.itemInformation}>Item Information</p>
            <p className={styles.passDescription}>{props.site}</p>
            <p className={styles.passText}>{props.password}</p>
            <p className={styles.passUsername}>{props.username}</p>
            
            <Image

                src={editIcon}
                alt="Picture of the author"
                width={20}
                height={20}
                className={styles.actionButton}
                onClick={editField}

            />
            <Image
                width={20}
                height={20}
                src={deleteIcon}
                alt="Picture of the author"
                className={styles.actionButton}
                onClick={deletePswd}

            />
        </div>
    )
}
export default Password;