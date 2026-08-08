import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import api from "../api/axios";
import styles from "../styles/Dashboard.module.css";
import Sidebar from "../components/Sidebar";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

    async function fetchDashboard() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/student/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDashboard(response.data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to fetch dashboard."
            );

        } finally {

            setLoading(false);

        }

    }

    fetchDashboard();

}, []);

if (loading) {

    return <h2>Loading...</h2>;

}

if (error) {

    return <h2>{error}</h2>;

}

    return (

    <div className={styles.layout}>

        <Sidebar />

        <main className={styles.mainContent}>

            <Navbar
                studentName={dashboard.student_name}
            />

            <h1 className={styles.heading}>
                Dashboard
            </h1>

            <p className={styles.welcome}>
                Welcome back, {dashboard.student_name}!
            </p>

            <p className={styles.department}>
                {dashboard.department} Department
            </p>

            <div className={styles.cardContainer}>

                <div className={styles.card}>
                    <h3>CGPA</h3>
                    <p>{dashboard.cgpa}</p>
                </div>

                <div className={styles.card}>
                    <h3>Attendance</h3>
                    <p>{dashboard.attendance_percentage}%</p>
                </div>

                <div className={styles.card}>
                    <h3>Pending Assignments</h3>
                    <p>{dashboard.pending_assignments}</p>
                </div>

            </div>

            <div className={styles.timetable}>

                <h2>Today's Classes</h2>

                <table>

                    <thead>

                        <tr>

                            <th>Subject</th>

                            <th>Time</th>

                            <th>Room</th>

                        </tr>

                    </thead>

                    <tbody>

                        {dashboard.today_classes.length > 0 ? (

                            dashboard.today_classes.map((classItem, index) => (

                                <tr key={index}>

                                    <td>{classItem.subject_name}</td>

                                    <td>
                                        {classItem.start_time.slice(0,5)} - {classItem.end_time.slice(0,5)}
                                    </td>

                                    <td>{classItem.room}</td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="3">
                                    No classes today.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </main>

    </div>

);
}

export default Dashboard;