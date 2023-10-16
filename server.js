// server.js
const express = require('express');
const app = express();
let status = 'closed';

app.use(express.static('public'));
app.use(express.text());

app.get('/status', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.write(`data: ${status}\n\n`);
});

app.post('/status', (req, res) => {
    status = req.body;
    res.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));