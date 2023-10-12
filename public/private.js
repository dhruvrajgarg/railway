// private.js
document.getElementById('open').onclick = function() {
    fetch('/status', { method: 'POST', body: 'open' });
};

document.getElementById('close').onclick = function() {
    fetch('/status', { method: 'POST', body: 'closed' });
};