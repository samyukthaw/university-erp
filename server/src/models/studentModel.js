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

//SUMBIT ASSIGNMENTS
async function submitStudentAssignment(userId, assignmentId, fileUrl) {

    //get student ID from user ID
    const studentQuery = `
    SELECT id
    FROM students
    WHERE user_id = $1;
    `;

    const studentResult = await pool.query(studentQuery, [userId]);
    const studentId = studentResult.rows[0].id;

    //insert submission into database
    const query = `
    INSERT INTO assignment_submissions
    (
        assignment_id,
        student_id,
        file_url,
        submitted_at,
        status
    )
    VALUES
    (
        $1,
        $2,
        $3,
        NOW(),
        'submitted'
    );
    `;

    await pool.query(query, [
        assignmentId,
        studentId,
        fileUrl
    ]);

    return {
        message: "Assignment submitted successfully."
    };
}

//GET TIMETABLE
async function getStudentTimetable(userId) {

    const query = `
        SELECT
            subjects.name AS subject_name,
            timetable.day,
            timetable.start_time,
            timetable.end_time,
            timetable.room
        FROM timetable
        JOIN subjects
            ON timetable.subject_id = subjects.id
        JOIN students
            ON timetable.department_id = students.department_id
        WHERE students.user_id = $1
        ORDER BY
        CASE timetable.day
            WHEN 'Monday' THEN 1
            WHEN 'Tuesday' THEN 2
            WHEN 'Wednesday' THEN 3
            WHEN 'Thursday' THEN 4
            WHEN 'Friday' THEN 5
        END,
        timetable.start_time;
    `;

    const result = await pool.query(query, [userId]);

    return result.rows;
}

//DASHBOARD
async function getStudentDashboard(userId) {

    const profileQuery = `
        SELECT
            users.name AS student_name,
            departments.name AS department,
            students.cgpa
        FROM students
        JOIN users
            ON students.user_id = users.id
        JOIN departments
            ON students.department_id = departments.id
        WHERE students.user_id = $1
        
    `;
    const attendanceQuery = `
        SELECT
            ROUND(
                (COUNT(CASE WHEN status = 'present' THEN 1 END) * 100.0)
                / COUNT(*),
                2
            ) AS attendance_percentage
        FROM attendance
        JOIN students
            ON attendance.student_id = students.id
        WHERE students.user_id = $1;
        `;

    const pendingAssignmentsQuery = `
        SELECT
            COUNT(assignments.id) AS pending_assignments
        FROM assignments
        JOIN subjects
            ON assignments.subject_id = subjects.id
        JOIN students
            ON subjects.department_id = students.department_id
        LEFT JOIN assignment_submissions
            ON assignments.id = assignment_submissions.assignment_id
            AND assignment_submissions.student_id = students.id
        WHERE students.user_id = $1
        AND assignment_submissions.id IS NULL;
    `;

    const todayClassesQuery = `
        SELECT
            subjects.name AS subject_name,
            timetable.start_time,
            timetable.end_time,
            timetable.room
        FROM timetable
        JOIN subjects
            ON timetable.subject_id = subjects.id
        JOIN students
            ON timetable.department_id = students.department_id
        WHERE students.user_id = $1
        AND timetable.day = TO_CHAR(CURRENT_DATE, 'FMDay');
        `;

    const profileResult = await pool.query(profileQuery, [userId]);

    const attendanceResult = await pool.query(attendanceQuery, [userId]);

    const pendingResult = await pool.query(
        pendingAssignmentsQuery,
        [userId]
    );

    const timetableResult = await pool.query(
        todayClassesQuery,
        [userId]
    );

    return {
        student_name: profileResult.rows[0].student_name,
        department: profileResult.rows[0].department,
        cgpa: profileResult.rows[0].cgpa,

        attendance_percentage:
            attendanceResult.rows[0].attendance_percentage,

        pending_assignments:
            pendingResult.rows[0].pending_assignments,

        today_classes:
            timetableResult.rows
    };


    
}

module.exports = {
    getStudentProfile,
    getStudentAttendance,
    getStudentMarks,
    getStudentAssignments,
    submitStudentAssignment,
    getStudentTimetable,
    getStudentDashboard
};