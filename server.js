// server.js
const express = require('express');
const WebSocket = require('ws');
const app = express();
let status = 'closed';

const wss = new WebSocket.Server({ noServer: true });

app.use(express.static('public'));
app.use(express.text());

app.get('/status', (req, res) => {
    //console.log('GET /status');
    res.send(status);
});

app.post('/status', (req, res) => {
    //console.log('POST /status');
    status = req.body;
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(status);
        }
    });
    res.end();
});

const server = app.listen(3000, () => console.log('HTTP server running on port 3000'));

server.on('upgrade', (request, socket, head) => {
    console.log('WebSocket connection');
    wss.handleUpgrade(request, socket, head, ws => {
        wss.emit('connection', ws, request);
    });
});