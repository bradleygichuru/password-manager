import styles from './Loader.module.css'
export default function Loader(props) {
    return (
        <div className={styles.container}>
            <svg class={styles.spinner} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class={styles.path} fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
            <p className={styles.message}>{props.name}</p>
        </div>



    )
}