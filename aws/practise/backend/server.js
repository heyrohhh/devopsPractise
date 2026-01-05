const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "database",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Rohit@123",
  database: process.env.DB_NAME || "book_db",
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
  console.log("Connected to DB");
});

app.get("/health", (req, res) => res.send("OK"));

app.get("/ready", (req, res) => {
  db.ping((err) => {
    if (err) return res.status(500).send("DB Not Ready");
    res.send("Ready");
  });
});

app.get("/api/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, data: result });
  });
});

app.post("/api/books", (req, res) => {
  const { title, author, description } = req.body;
  db.query(
    "INSERT INTO books (title, author, description) VALUES (?, ?, ?)",
    [title, author, description || ""],
    (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({
        success: true,
        data: { id: result.insertId, title, author, description },
      });
    }
  );
});

app.delete("/api/books/:id", (req, res) => {
  db.query(
    "DELETE FROM books WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true });
    }
  );
});

app.listen(9000, "0.0.0.0", () => {
  console.log("Backend running on port 9000");
});
