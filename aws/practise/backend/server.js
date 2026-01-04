const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); 

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Rohit@123',
    database: process.env.DB_NAME || 'book_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});
// Add Health Check for K8s Probes
app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/ready', (req, res) => {
    // Check if Database is connected
    if (db.authorized || db.state === 'authenticated') {
        res.status(200).send('Ready');
    } else {
        res.status(500).send('DB Not Ready');
    }
});
// Get all books
app.get('/api/books', (req, res) => {
    db.query("SELECT * FROM books", (err, result) => {
        if (err) res.status(500).send(err);
        else res.json(result);
    });
});

// Add a book
app.post('/api/books', (req, res) => {
    const { title, author, description } = req.body;
    const query = "INSERT INTO books (title, author, description) VALUES (?, ?, ?)";
    db.query(query, [title, author, description], (err, result) => {
        if (err) res.status(500).send(err);
        else res.json({ id: result.insertId, ...req.body });
    });
});

// Remove a book
app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.json({ message: "Book deleted" });
    });
});

const PORT = 9000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});