import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";

function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    function handleLogout() {

        localStorage.removeItem("token");

        navigate("/");

    }

    return (

        <aside className={styles.sidebar}>

            <h2 className={styles.logo}>
                University ERP
            </h2>

            <nav className={styles.navLinks}>

                <Link
                    to="/dashboard"
                    className={
                        location.pathname === "/dashboard"
                            ? styles.active
                            : styles.link
                    }
                >
                    Dashboard
                </Link>

                <Link
                    to="/profile"
                    className={
                        location.pathname === "/profile"
                            ? styles.active
                            : styles.link
                    }
                >
                    Profile
                </Link>

                <Link
                    to="/attendance"
                    className={
                        location.pathname === "/attendance"
                            ? styles.active
                            : styles.link
                    }
                >
                    Attendance
                </Link>

                <Link
                    to="/marks"
                    className={
                        location.pathname === "/marks"
                            ? styles.active
                            : styles.link
                    }
                >
                    Marks
                </Link>

                <Link
                    to="/assignments"
                    className={
                        location.pathname === "/assignments"
                            ? styles.active
                            : styles.link
                    }
                >
                    Assignments
                </Link>

                <Link
                    to="/timetable"
                    className={
                        location.pathname === "/timetable"
                            ? styles.active
                            : styles.link
                    }
                >
                    Timetable
                </Link>

            </nav>

            <button
                className={styles.logoutButton}
                onClick={handleLogout}
            >
                Logout
            </button>

        </aside>

    );

}

export default Sidebar;