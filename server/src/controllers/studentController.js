const { 
    getStudentProfile,
    getStudentAttendance,
    getStudentMarks,
    getStudentAssignments,
    submitStudentAssignment,
    getStudentTimetable,
    getStudentDashboard
 } = require("../models/studentModel");

// GET PROFILE FUNCTION
async function getProfile(req, res) {
    try {

        const userId = req.user.id;
        
        const student = await getStudentProfile(userId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
}

//GET ATTENDANCE FUNCTION
async function getAttendance(req, res) {

    try {

        const userId = req.user.id;

        const attendance = await getStudentAttendance(userId);

        res.status(200).json(attendance);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

}

//GET MARKS FUNCTION
async function getMarks(req, res) {

    try {

        const userId = req.user.id;

        const marks = await getStudentMarks(userId);

        res.status(200).json(marks);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

}

//GET ASSIGNMENTS
async function getAssignments(req, res) {

    try {

        const userId = req.user.id;

        const assignments = await getStudentAssignments(userId);

        res.status(200).json(assignments);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

}

//SUBMIT ASSIGNMENT
async function submitAssignment(req, res) {

    try {

        const userId = req.user.id;

        const { assignmentId, fileUrl } = req.body;

        const result = await submitStudentAssignment(
            userId,
            assignmentId,
            fileUrl
        );

        res.status(201).json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error submitting assignment."
        });

    }

}

//GET TIMETABLE
async function getTimetable(req, res) {

    try {

        const userId = req.user.id;

        const timetable = await getStudentTimetable(userId);

        res.status(200).json(timetable);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error Fetching timetable."
        });

    }

}

//GET DASHBOARD
async function getDashboard(req, res) {

    try {

        const userId = req.user.id;

        const dashboard = await getStudentDashboard(userId);

        res.status(200).json(dashboard);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error Fetching dashboard."
        });

    }

}



module.exports = {
    getProfile,
    getAttendance,
    getMarks,
    getAssignments,
    submitAssignment,
    getTimetable,
    getDashboard
};