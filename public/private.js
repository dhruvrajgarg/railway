// private.js
document.getElementById('close').onclick = function() {
    const currentTime = new Date().toISOString();
    const data = JSON.stringify({ status: 'closed', timestamp: currentTime });

    fetch('/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
};

document.getElementById('open').onclick = function() {
    const currentTime = new Date().toISOString();
    const data = JSON.stringify({ status: 'open', timestamp: currentTime });

    fetch('/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
};