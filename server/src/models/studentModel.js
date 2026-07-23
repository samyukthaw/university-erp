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

//GET STUDENT MARKS
async function getStudentMarks(userId) {

    const query = `
        SELECT
            subjects.name AS subject_name,
            marks.semester,
            marks.internal_marks,
            marks.external_marks,
            marks.grade
        FROM marks
        JOIN students
            ON marks.student_id = students.id
        JOIN subjects
            ON marks.subject_id = subjects.id
        WHERE students.user_id = $1
            AND marks.published = true
        ORDER BY subjects.name;
    `;

    const result = await pool.query(query, [userId]);

    return result.rows;
}

//VIEW ASSIGNMENTS
async function getStudentAssignments(userId) {

    const query = `
        SELECT
            assignments.id,
            assignments.title,
            assignments.description,
            assignments.file_url,
            assignments.due_date,
            assignments.max_marks,
            subjects.name AS subject_name
        FROM assignments
        JOIN subjects
            ON assignments.subject_id = subjects.id
        JOIN students
            ON students.department_id = subjects.department_id
        WHERE students.user_id = $1
        ORDER BY assignments.due_date;
    `;

    const result = await pool.query(query, [userId]);

    return result.rows;
}



module.exports = {
    getStudentProfile,
    getStudentAttendance,
    getStudentMarks,
    getStudentAssignments

};