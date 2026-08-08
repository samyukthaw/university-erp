import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";
import Assignments from "./pages/Assignments";
import Timetable from "./pages/Timetable";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/attendance"
                element={
                    <ProtectedRoute>
                        <Attendance />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/marks"
                element={
                    <ProtectedRoute>
                        <Marks />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/assignments"
                element={
                    <ProtectedRoute>
                        <Assignments />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/timetable"
                element={
                    <ProtectedRoute>
                        <Timetable />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default App;