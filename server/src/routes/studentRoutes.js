const express = require("express");

const { getProfile,
    getAttendance
} = require("../controllers/studentController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/profile",
    authenticateToken,      
    getProfile
);

router.get(
    "/attendance",
    authenticateToken,      
    getAttendance
);



module.exports = router;