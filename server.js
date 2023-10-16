// server.js
const express = require('express');
const app = express();
let status = 'closed';
let clients = [];

app.use(express.static('public'));
app.use(express.text());

app.get('/status', (req, res) => {
    console.log('GET /status');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Send the current status immediately
    res.write(`data: ${status}\n\n`);
    console.log(`Sent status: ${status}`);

    // Add this client to the clients array
    clients.push(res);
    console.log(`Added client. Total clients: ${clients.length}`);

    // Remove this client from the clients array when the connection is closed
    req.on('close', () => {
        clients = clients.filter(client => client !== res);
        console.log(`Removed client. Total clients: ${clients.length}`);
    });
});

app.post('/status', (req, res) => {
    console.log('POST /status');
    status = req.body;
    console.log(`Received status: ${status}`);

    // Send the new status to all connected clients
    clients.forEach(client => {
        client.write(`data: ${status}\n\n`);
        console.log(`Sent status to client: ${status}`);
    });

    res.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));