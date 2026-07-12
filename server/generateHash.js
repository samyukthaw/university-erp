const bcrypt = require("bcrypt");

async function generateHashes() {
    console.log("Student:", await bcrypt.hash("student123", 10));
    console.log("Faculty:", await bcrypt.hash("faculty123", 10));
    console.log("Admin:", await bcrypt.hash("admin123", 10));
}

generateHashes();