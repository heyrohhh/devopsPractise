const express = require('express');
const app = express();
const port = 3000;

// Ye environment variables hum ConfigMap aur Secret se bhejenge
const dbHost = process.env.DB_HOST || 'localhost';
const dbUser = process.env.DB_USER || 'root';

app.get('/api/tasks', (req, res) => {
  res.json({
    message: "Backend se data aa raha hai!",
    database_connected_to: dbHost,
    user_used: dbUser,
    tasks: ["Seekhna K8s", "Dockerize karna", "Deployment banana"]
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('I am healthy!');
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});