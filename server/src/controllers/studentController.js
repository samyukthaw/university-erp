const { 
    getStudentProfile,
    getStudentAttendance
 } = require("../models/studentModel");

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

module.exports = {
    getProfile,
    getAttendance

};