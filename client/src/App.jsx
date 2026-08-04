import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";
import Assignments from "./pages/Assignments";
import Timetable from "./pages/Timetable";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/profile"
                element={<Profile />}
            />

            <Route
                path="/attendance"
                element={<Attendance />}
            />

            <Route
                path="/marks"
                element={<Marks />}
            />

            <Route
                path="/assignments"
                element={<Assignments />}
            />

            <Route
                path="/timetable"
                element={<Timetable />}
            />

        </Routes>

    );

}

export default App;