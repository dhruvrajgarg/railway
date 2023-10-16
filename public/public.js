// public.js
const statusElement = document.getElementById('status');
const lastUpdatedElement = document.getElementById('last-updated');
const bodyElement = document.body;
const es = new EventSource('/status');

es.onmessage = function(event) {
    const status = event.data;
    statusElement.textContent = `The barrier is ${status}`;
    bodyElement.className = status;
    lastUpdatedElement.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
};