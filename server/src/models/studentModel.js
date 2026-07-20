const pool = require("../config/db");

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

module.exports = {
    getStudentProfile
};