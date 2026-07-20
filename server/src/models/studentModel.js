const pool = require("../config/db");

//STUDENT PROFILE
async function getStudentProfile(userId) {

    const query = `
        SELECT
            users.id,
            users.name,
            users.email,
            students.roll_number,
            students.semester,
            departments.name AS department
        FROM users
        JOIN students
            ON users.id = students.user_id
        JOIN departments
            ON students.department_id = departments.id
        WHERE users.id = $1
    `;

    const result = await pool.query(query, [userId]);

    return result.rows[0];
}

// GET ATTENDANCE
async function getStudentAttendance(userId) {

    const query = `
        SELECT
            subjects.name AS subject_name,
            attendance.date,
            attendance.status
        FROM attendance
        JOIN students
            ON attendance.student_id = students.id
        JOIN subjects
            ON attendance.subject_id = subjects.id
        WHERE students.user_id = $1
        ORDER BY attendance.date DESC;
    `;

    const result = await pool.query(query, [userId]);

    return result.rows;
}

module.exports = {
    getStudentProfile,
    getStudentAttendance
};