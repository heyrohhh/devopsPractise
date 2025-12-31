const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// GET all employees
app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) res.status(500).send(err);
        else res.json(result);
    });
});

// ADD employee
app.post('/employees', (req, res) => {
    const { name, position, email, salary } = req.body;
    db.query("INSERT INTO employees (name, position, email, salary) VALUES (?,?,?,?)", 
    [name, position, email, salary], (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
    });
});

// EDIT employee
app.put('/employees/:id', (req, res) => {
    const { name, position, email, salary } = req.body;
    db.query("UPDATE employees SET name=?, position=?, email=?, salary=? WHERE id=?", 
    [name, position, email, salary, req.params.id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
    });
});

// DELETE employee
app.delete('/employees/:id', (req, res) => {
    db.query("DELETE FROM employees WHERE id = ?", [req.params.id], (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
    });
});


// Health Check for Liveness Probe
app.get('/health', (req, res) => {
    res.status(200).send('Healthy');
});

// Readiness Probe (Optional but good)
app.get('/ready', (req, res) => {
    // Check if Database is connected
    if (db.authorized || db.state === 'authenticated') {
        res.status(200).send('Ready');
    } else {
        res.status(500).send('DB Not Ready');
    }
});

// KUBERNETES READY: Listen on 0.0.0.0
const PORT = 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});