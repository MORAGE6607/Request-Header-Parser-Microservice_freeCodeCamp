const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the Request Header Parser Microservice! Use /api/whoami to get your header information.');
});

// Route to handle requests to /api/whoami
app.get('/api/whoami', (req, res) => {
    const ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const language = req.headers['accept-language'].split(',')[0];
    const software = req.headers['user-agent'];

    res.json({
        ipaddress: ipaddress,
        language: language,
        software: software
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});