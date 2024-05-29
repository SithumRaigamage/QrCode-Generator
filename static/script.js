document.getElementById('qr-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const url = document.getElementById('url').value;

    fetch('/generate_qr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.blob())
    .then(blob => {
        const qrCode = document.getElementById('qr-code');
        qrCode.innerHTML = '';
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        qrCode.appendChild(img);

        const downloadBtn = document.getElementById('download-btn');
        downloadBtn.onclick = function() {
            const a = document.createElement('a');
            a.href = img.src;
            a.download = 'qrcode.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
    })
    .catch(error => console.error('Error:', error));
});