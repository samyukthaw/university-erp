import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Assignments.module.css";

function Assignments() {

    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchAssignments() {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/student/assignments",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(response.data);

                setAssignments(response.data);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch assignments."
                );

            } finally {

                setLoading(false);

            }

        }

        fetchAssignments();

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
                    studentName="Student"
                />

                <h1 className={styles.heading}>
                    Assignments
                </h1>

                <div className={styles.assignmentContainer}>

                    {assignments.length > 0 ? (

                        assignments.map((assignment) => (

                            <div
                                className={styles.assignmentCard}
                                key={assignment.id}
                            >

                                <div>

                                    <h2>
                                        {assignment.title}
                                    </h2>

                                    <p>
                                        {assignment.description}
                                    </p>

                                    <span>
                                        Due: {assignment.due_date}
                                    </span>

                                </div>

                                <div className={styles.status}>
                                    {assignment.status}
                                </div>

                            </div>

                        ))

                    ) : (

                        <p className={styles.empty}>
                            No assignments found.
                        </p>

                    )}

                </div>

            </main>

        </div>

    );

}

export default Assignments;