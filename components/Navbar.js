import styles from './Navbar.module.css';
import { useCookies } from "react-cookie";
import { useRouter } from 'next/router';

function Navbar() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const router = useRouter()
    function handleRemoveCookie() {
        removeCookie("token");
        router.push('/')
      }
    return (
        <div className={styles.head}>
            <p className={styles.headText}>simple password manager</p>
            <button onClick={handleRemoveCookie} className={styles.logoutButton}>logout</button>
        </div>
    )
}
export default Navbar;