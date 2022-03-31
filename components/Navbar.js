import styles from './Navbar.module.css'
function Navbar (){
    return(
        <div className={styles.head}>
        <p className={styles.headText}>simple password manager</p>
    </div>
    )
}
export default Navbar;