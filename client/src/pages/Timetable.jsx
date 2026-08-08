import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Timetable.module.css";

function Timetable() {

    const [timetable, setTimetable] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchTimetable() {

            try {

                const token = localStorage.getItem("token");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await api.get(
                    "/student/timetable",
                    config
                );

                const profileResponse = await api.get(
                    "/student/profile",
                    config
                );

                console.log(response.data);
                console.log(profileResponse.data);

                setTimetable(response.data);
                setStudentName(profileResponse.data.name);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch timetable."
                );

            } finally {

                setLoading(false);

            }

        }

        fetchTimetable();

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
                    Timetable
                </h1>

                <div className={styles.timetableCard}>

                    <table>

                        <thead>

                            <tr>
                                <th>Day</th>
                                <th>Subject</th>
                                <th>Time</th>
                                <th>Room</th>
                            </tr>

                        </thead>

                        <tbody>

                            {timetable.length > 0 ? (

                                timetable.map((item, index) => (

                                    <tr key={index}>

                                        <td>{item.day}</td>

                                        <td>{item.subject_name}</td>

                                        <td>
                                            {item.start_time} - {item.end_time}
                                        </td>

                                        <td>{item.room}</td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="4">
                                        No timetable records found.
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

export default Timetable;