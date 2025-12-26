const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// MySQL Connection
const db = mysql.createConnection({
    host: 'mysql', // Docker service name for MySQL
    user: 'root', // Your MySQL username
    password: 'Rohit@123', // Your MySQL password
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");

    // Auto-create Database and Table
    db.query("CREATE DATABASE IF NOT EXISTS college_voting", (err) => {
        if (err) throw err;
        db.query("USE college_voting");
        const createTable = `CREATE TABLE IF NOT EXISTS votes (
            candidate_name VARCHAR(50) PRIMARY KEY,
            vote_count INT DEFAULT 0
        )`;
        db.query(createTable, () => {
            const initQuery = "INSERT IGNORE INTO votes (candidate_name, vote_count) VALUES ('Doraemon Team', 0), ('Ninja Hattori', 0), ('Shinchan', 0), ('Pokemon', 0)";
            db.query(initQuery);
        });
    });
});

// API: Get current votes
app.get('/results', (req, res) => {
    db.query("SELECT * FROM votes", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// API: Submit a vote
app.post('/vote', (req, res) => {
    const { candidate } = req.body;
    const query = "UPDATE votes SET vote_count = vote_count + 1 WHERE candidate_name = ?";
    db.query(query, [candidate], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Vote cast successfully!" });
    });
});

app.listen(8000, () => console.log("Server running on http://localhost:8000"));