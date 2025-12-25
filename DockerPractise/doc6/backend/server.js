const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

app.use(express.json());

// Sabse important line:
// Hum server ko bata rahe hain ki 'public' folder kahan hai
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Agar koi "/" par aaye toh seedha index.html bhejo
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// API Routes
let todos = [];
app.get('/api/todos', (req, res) => res.json(todos));

app.post('/api/todos', (req, res) => {
    const newTodo = { id: Date.now(), text: req.body.text };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running! Check http://localhost:5500`);
});