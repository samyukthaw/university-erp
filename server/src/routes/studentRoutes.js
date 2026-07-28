const express = require("express");

const { getProfile,
    getAttendance,
    getMarks,
    getAssignments,
    submitAssignment,
    getTimetable,
    getDashboard
} = require("../controllers/studentController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

//get profile route
router.get(
    "/profile",
    authenticateToken,      
    getProfile
);

//get attendance route
router.get(
    "/attendance",
    authenticateToken,      
    getAttendance
);

//get marks route
router.get(
    "/marks",
    authenticateToken,      
    getMarks
);

//get assignments route
router.get(
    "/assignments",
    authenticateToken,      
    getAssignments
);

//submit assignment route
router.post(
    "/submit-assignment",
    authenticateToken,      
    submitAssignment
);

//get timetable route
router.get(
    "/timetable",
    authenticateToken,      
    getTimetable
);

//get dashboard route
router.get(
    "/dashboard",
    authenticateToken,      
    getDashboard
);

module.exports = router;