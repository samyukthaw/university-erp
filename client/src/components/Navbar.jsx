import { useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

function Navbar({ studentName }) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                University ERP
            </div>

            <div className={styles.rightSection}>
                <div className={styles.profileCircle}>
                    {studentName.charAt(0)}
                </div>

                <span className={styles.studentName}>
                    {studentName}
                </span>

                <button
                    className={styles.logoutButton}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;