const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Change 1
const fs = require('fs');

const app = express();
const dir = './data';

// Automatically create data directory if it doesn't exist
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

// Change 2: Open database with a callback
const db = new sqlite3.Database('./data/banking.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to the SQLite database.');
});

app.use(express.json());
app.use(express.static('public'));

// --- Database Initialization ---
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        balance REAL DEFAULT 0
    )`);
});

// --- Updated API Routes (Callback Style) ---

app.post('/api/accounts', (req, res) => {
    const { name, initialBalance } = req.body;
    const query = 'INSERT INTO accounts (name, balance) VALUES (?, ?)';
    db.run(query, [name, initialBalance || 0], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name, balance: initialBalance });
    });
});

app.get('/api/accounts', (req, res) => {
    db.all('SELECT * FROM accounts', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// ... similar changes would be needed for Credit and Debit ...

app.listen(3000, () => console.log('Server running on http://localhost:3000'));