const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors'); // Ensure you have run: npm install cors

const app = express();

// 1. Enable CORS for Express Routes (Fetch calls)
app.use(cors({
    origin: "http://localhost:5500", // Your Frontend URL
    methods: ["GET", "POST"]
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend')));

const server = http.createServer(app);

// 2. Enable CORS for Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5500",
        methods: ["GET", "POST"]
    }
});

// 3. Database Connection Config
const dbConfig = {
    host: process.env.DB_HOST || 'mysql', 
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Rohit@123',
    // Do not include 'database' here yet, we create it first
    multipleStatements: true
};

const connection = mysql.createConnection(dbConfig);

// 4. Auto-Initialize Database and Tables
connection.query(`CREATE DATABASE IF NOT EXISTS office_chat;`, (err) => {
    if (err) {
        console.error("MySQL Connection Error: ", err.message);
        return;
    }

    // Connect to the specific database now
    const db = mysql.createConnection({ ...dbConfig, database: 'office_chat' });

    const schema = `
        CREATE TABLE IF NOT EXISTS departments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL
        );
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin', 'employee') DEFAULT 'employee',
            dept_id INT,
            FOREIGN KEY (dept_id) REFERENCES departments(id)
        );
    `;

    db.query(schema, (err) => {
        if (err) console.error("Schema Creation Error:", err.message);
        
        // Default Admin Setup
        db.query("INSERT IGNORE INTO users (username, password, role) VALUES ('Rohit', 'PST', 'admin')", (err) => {
            if (!err) console.log("Database & Admin Ready.");
        });
    });

    // --- API Routes ---

    app.post('/api/login', (req, res) => {
        const { username, password } = req.body;
        const q = 'SELECT u.*, d.name as dept_name FROM users u LEFT JOIN departments d ON u.dept_id = d.id WHERE u.username = ? AND u.password = ?';
        db.execute(q, [username, password], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length > 0) res.json({ success: true, user: results[0] });
            else res.status(401).json({ success: false });
        });
    });

    app.post('/api/admin/create-dept', (req, res) => {
        db.execute('INSERT INTO departments (name) VALUES (?)', [req.body.name], (err) => {
            if (err) return res.status(500).json({ success: false });
            res.json({ success: true });
        });
    });

    app.get('/api/departments', (req, res) => {
        db.query('SELECT * FROM departments', (err, results) => {
            if (err) return res.status(500).json([]);
            res.json(results);
        });
    });

    app.post('/api/admin/create-user', (req, res) => {
        const { username, password, dept_id } = req.body;
        db.execute('INSERT INTO users (username, password, dept_id) VALUES (?, ?, ?)', [username, password, dept_id], (err) => {
            if (err) return res.status(500).json({ success: false });
            res.json({ success: true });
        });
    });
});

// --- Socket.io Real-time Logic ---
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('chatMessage', (data) => {
        // Broadcast message to everyone in the room
        io.to(data.room).emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// --- Start Server ---
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});