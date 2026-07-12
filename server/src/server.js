require("dotenv").config({ path: "./.env" });

const authRoutes = require("./routes/authRoutes");

console.log("===== ENV TEST =====");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("====================");

const express = require("express");
const cors = require("cors");

const app = express();

const pool = require("./config/db");

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
    res.send("University ERP Backend is Running 🚀");
});

pool.connect()
    .then(() => {
        console.log("✅ Connected to PostgreSQL");
    })
    .catch((err) => {
        console.error("❌ Database connection failed");
        console.error(err);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});