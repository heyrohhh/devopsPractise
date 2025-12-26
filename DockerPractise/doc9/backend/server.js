const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Using a Pool instead of a single connection for better stability
const db = mysql.createPool({
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Rohit@123',
    database: process.env.DB_NAME || 'recipe_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 2. Log connection status
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed: ', err.message);
    } else {
        console.log('Connected to MySQL Database!');
        connection.release();
    }
});

// 3. Robust Search Endpoint
app.get('/api/recipes', (req, res) => {
    const searchTerm = req.query.search || '';
    const sql = "SELECT * FROM recipes WHERE title LIKE ?";
    
    // Using the pool to execute the query
    db.execute(sql, [`%${searchTerm}%`], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});

// 4. Health Check Endpoint (Useful for Docker)
app.get('/health', (req, res) => {
    res.status(200).send('Server is running');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});