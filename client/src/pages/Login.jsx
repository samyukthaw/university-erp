import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    //axios code
    async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
        //sending the request
        const response = await api.post(
            "/auth/login",
            {
                email,
                password
            }
        ); 
        localStorage.setItem(
            "token",
            response.data.token
        );
        setEmail("");
        setPassword("");
        navigate("/dashboard");

    } catch (error) {
        setError( 
            error.response?.data?.message ||
            "Login failed."
        );
    }
}

    return (

        <div className={styles.loginContainer}>

            <div className={styles.loginCard}>

                <h1 className={styles.title}>
                    University ERP
                </h1>

                <p className={styles.subtitle}>
                    Welcome back! Please login to continue.
                </p>

                <form onSubmit={handleLogin}>

                    <div className={styles.inputGroup}>

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className={styles.inputGroup}>

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    {error && (

                        <p className={styles.errorMessage}>
                            {error}
                        </p>

                    )}

                    <button
                        type="submit"
                        className={styles.loginButton}
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;