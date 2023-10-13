// server.js
const express = require('express');
const WebSocket = require('ws');
const app = express();
let status = 'closed';
const PORT = process.env.PORT || 3000 ;
const wss = new WebSocket.Server({ noServer: true });

app.use(express.static('public'));
app.use(express.text());

app.get('/status', (req, res) => {
    console.log('GET /status');
    res.send(status);
});

app.post('/status', (req, res) => {
    console.log('POST /status');
    status = req.body;
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(status);
        }
    });
    res.end();
});

const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

server.on('upgrade', (request, socket, head) => {
    console.log('WebSocket connection');
    wss.handleUpgrade(request, socket, head, ws => {
        wss.emit('connection', ws, request);
    });
});