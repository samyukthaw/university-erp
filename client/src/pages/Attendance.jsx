import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Attendance.module.css";

function Attendance() {

    const [attendance, setAttendance] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchAttendance() {

            try {

                const token = localStorage.getItem("token");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await api.get(
                    "/student/attendance",
                    config
                );

                const profileResponse = await api.get(
                    "/student/profile",
                    config
                );

                console.log(response.data);
                console.log(profileResponse.data);

                setAttendance(response.data);
                setStudentName(profileResponse.data.name);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch attendance."
                );

            } finally {

                setLoading(false);

            }

        }

        fetchAttendance();

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
                    studentName={studentName}
                />

                <h1 className={styles.heading}>
                    Attendance
                </h1>

                <div className={styles.attendanceCard}>

                    <table>

                        <thead>

                            <tr>
                                <th>Subject</th>
                                <th>Total Classes</th>
                                <th>Classes Attended</th>
                                <th>Attendance</th>
                            </tr>

                        </thead>

                        <tbody>

                            {attendance.length > 0 ? (

                                attendance.map((item, index) => (

                                    <tr key={index}>

                                        <td>
                                            {item.subject_name}
                                        </td>

                                        <td>
                                            {item.total_classes}
                                        </td>

                                        <td>
                                            {item.classes_attended}
                                        </td>

                                        <td>
                                            {item.attendance_percentage}%
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="4">
                                        No attendance records found.
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

export default Attendance;