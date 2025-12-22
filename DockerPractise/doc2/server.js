const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Celebration started at http://localhost:${PORT}`);
});