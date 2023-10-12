// public.js
const statusElement = document.getElementById('status');
const bodyElement = document.body;
const ws = new WebSocket(`ws://${location.host}`);

ws.onmessage = function(event) {
    console.log('WebSocket message', event.data);
    const status = event.data;
    statusElement.textContent = `The Barrier is ${status}`;
    bodyElement.className = status;
};

ws.onopen = function() {
    console.log('WebSocket open');
    ws.send('getStatus');
};

ws.onerror = function(error) {
    console.error(`WebSocket error: ${error}`);
};