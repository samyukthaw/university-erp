import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Profile.module.css";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchProfile() {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/student/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(response.data);

                setProfile(response.data);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch profile."
                );

            } finally {

                setLoading(false);

            }

        }

        fetchProfile();

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
                    studentName={profile.name}
                />

                <h1 className={styles.heading}>
                    My Profile
                </h1>

                <div className={styles.profileCard}>

                    <div className={styles.profileHeader}>

                        <div className={styles.profileCircle}>
                            {profile.name.charAt(0)}
                        </div>

                        <div>
                            <h2>{profile.name}</h2>
                            <p>{profile.email}</p>
                        </div>

                    </div>

                    <div className={styles.details}>

                        <div className={styles.detailItem}>
                            <span>Roll Number</span>
                            <p>{profile.roll_number}</p>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Department</span>
                            <p>{profile.department}</p>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Semester</span>
                            <p>{profile.semester}</p>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Email</span>
                            <p>{profile.email}</p>
                        </div>

                    </div>

                </div>

            </main>

        </div>

    );

}

export default Profile;