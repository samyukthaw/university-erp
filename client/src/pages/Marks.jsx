import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Marks.module.css";

function Marks() {

    const [marks, setMarks] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchMarks() {

            try {

                const token = localStorage.getItem("token");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await api.get(
                    "/student/marks",
                    config
                );

                const profileResponse = await api.get(
                    "/student/profile",
                    config
                );

                console.log(response.data);
                console.log(profileResponse.data);

                setMarks(response.data);
                setStudentName(profileResponse.data.name);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch marks."
                );

            } finally {

                setLoading(false);

            }

        }

        fetchMarks();

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
                    Marks
                </h1>

                <div className={styles.marksCard}>

                    <table>

                        <thead>

                            <tr>
                                <th>Subject</th>
                                <th>Internal</th>
                                <th>External</th>
                                <th>Total</th>
                            </tr>

                        </thead>

                        <tbody>

                            {marks.length > 0 ? (

                                marks.map((item, index) => (

                                    <tr key={index}>

                                        <td>
                                            {item.subject_name}
                                        </td>

                                        <td>
                                            {item.internal_marks}
                                        </td>

                                        <td>
                                            {item.external_marks}
                                        </td>

                                        <td>
                                            {(
                                                Number(item.internal_marks) +
                                                Number(item.external_marks)
                                            ).toFixed(2)}
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="4">
                                        No marks found.
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

export default Marks;