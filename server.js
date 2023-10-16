// server.js
const express = require('express');
const app = express();
let status = 'closed';
let clients = [];

app.use(express.static('public'));
app.use(express.text());

app.get('/status', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Send the current status immediately
    res.write(`data: ${status}\n\n`);

    // Add this client to the clients array
    clients.push(res);

    // Remove this client from the clients array when the connection is closed
    req.on('close', () => {
        clients = clients.filter(client => client !== res);
    });
});

app.post('/status', (req, res) => {
    status = req.body;

    // Send the new status to all connected clients
    clients.forEach(client =>
        client.write(`data: ${status}\n\n`)
    );

    res.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));