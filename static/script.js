document.getElementById('qr-code').addEventListener('submit' , function (e){
    e.preventDefault();

    const url = document.getElementById('url').value;

    fetch('/generate-qr',{
        method: 'POST' ,
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({url :url})
    })
    .then(Response => Response.blob())
    .then(blob => {

        const qrCode = document.getElementById('qr-code');
        qrCode.innerHTML='';
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        qrCode.appendChild(img);

    })
    .catch(err => console.error('Error:',err));

});